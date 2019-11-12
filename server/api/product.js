const router = require('express').Router()
const {Product, Review, Merchant, User} = require('../db/models')
const {getProductQuery} = require('./helpers')

module.exports = router

// GET api/product (get catalog)
router.get('/', async (req, res, next) => {
  try {
    const {where, include} = getProductQuery(req.query)
    const {skip: offset, query: {limit, sort = 'id.ASC'}} = req
    const products = await Product.findAll({
      where,
      limit,
      offset,
      order: [sort.split('.')],
      include
      // for multiple sort -- sort.split(",").map(s => s.split("."))
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET api/product/:productId (get single product)
router.get('/:productId', async (req, res, next) => {
  try {
    const {params: {productId}} = req
    const product = await Product.findByPk(productId, {include: [Review]})
    if (!product) throw new Error('Product not found')
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// PUT api/product/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const {user, params: {productId}, body} = req
    const [_, [product]] = await Product.update(body, {
      where: {id: productId},
      returning: true
    })
    if (!req.user || (user.merchantId !== product.merchantId && !user.isAdmin))
      throw new Error('You are not the merchant of this item.')
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// POST api/product/review
router.post('/review', async (req, res, next) => {
  try {
    if (!req.user) throw new Error('Not logged in')
    const {body: {...body}, user: {id: userId}} = req
    const review = await Review.create({userId, ...body})
    res.json(review)
  } catch (err) {
    next(err)
  }
})

// PUT api/product/review/:reviewId (update user review)
router.put('/review/:reviewId', async (req, res, next) => {
  try {
    if (!req.user) throw new Error('Not logged in')
    // Need to handle the case where a user tries to edit a review that isn't theirs!
    const {params: {reviewId}, body, user: {id: userId}} = req
    const review = await Review.update(
      {userId, ...body},
      {
        where: {id: reviewId}
      }
    )
    res.json(review)
  } catch (err) {
    next(err)
  }
})

// DELETE api/product/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    if (!req.user) throw new Error('Not logged in')
    const {user: {merchantId}, params: {productId}} = req
    await (await Product.findByPk(productId)).setMerchant(1)
    const destroyed = await Product.destroy({
      where: {id: productId, merchantId},
      returning: true
    })
    if (!destroyed)
      throw new Error(`Cannot delete product with ID of ${productId}`)
    res.status(200).send('OK')
  } catch (err) {
    next(err)
  }
})

// POST api/product/
router.post('/', async (req, res, next) => {
  try {
    if (!req.user || !req.user.merchantId || !req.user.isAdmin)
      throw new Error('Not authorized')
    // const newMerchant = await Merchant.create({merchantName:req.user.name})
    // if(newMerchant) {
    //   const admin = await User.findByPk(req.user.id)
    //   await admin.update({merchantId: newMerchant.id})
    // }
    const {user: {merchantId}, params: {body}} = req
    const product = await Product.create({...body, merchantId})
    res.json(product)
  } catch (err) {
    next(err)
  }
})
