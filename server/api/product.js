const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

// GET api/product (get catalog)
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
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
    const {params: {productId}, body} = req
    const [_, [product]] = await Product.update(body, {
      where: {id: productId},
      returning: true
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// POST api/product/review
router.post('/review', async (req, res, next) => {
  try {
    if (!req.user) throw new Error('Not logged in')
    const {body: {productId, ...body}, user: {id: userId}} = req
    const review = await Review.create(
      {userId, body},
      {
        where: {id: productId}
      }
    )
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
    const review = await Review.update(body, {
      where: {id: reviewId}
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})

// DELETE api/product/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    const {params: {productId}} = req
    await Product.destroy({where: {id: productId}})
    res.status(200).send('OK')
  } catch (err) {
    next(err)
  }
})

// POST api/product/
router.post('/', async (req, res, next) => {
  try {
    const {params: {body}} = req
    const product = await Product.create(body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})