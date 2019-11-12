const router = require('express').Router()
const {Product, Review, Category} = require('../db/models')
const {getProductQuery} = require('./helpers')
const db = require('../db/db')

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

// GET api/product/category (get all categories)
router.get('/category', async (req, res, next) => {
  try {
    // getProductQuery returns an object where and a single-index array include where the first
    // index includes an object with a where statement.
    const {where, include: [{where: categoryWhere}]} = getProductQuery(
      req.query
    )

    // it makes me INREDIBLY sad to comment this out because I thought it was working
    // and I broke my brain to try and figure this out and at the end of it all the counts
    // were off (notably a query that should return 0 results shows up as 1 item in each
    // category). But I'll leave it here for posterity.

    // const categories = await Category.findAll({
    //   where: categoryWhere,
    //   group: ['category.id', 'category.name'],
    //   attributes: [
    //     'id',
    //     'name',
    //     [db.Sequelize.fn('COUNT', 'ProductCategory.id'), 'count']
    //   ],
    //   include: [
    //     {
    //       model: db.models.ProductCategory,
    //       attributes: [],
    //       include: [
    //         {
    //           model: Product,
    //           where,
    //           attributes: []
    //         }
    //       ]
    //     }
    //   ]
    // })

    const categories = await Category.findAll({
      where: categoryWhere,
      order: [['id', 'ASC']],
      include: [
        {
          model: Product,
          where,
          attributes: []
        }
      ]
    })
    res.status(200).json(categories)
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
    if (!req.user || user.merchantId !== product.merchantId)
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
    if (!req.user || !req.user.merchantId) throw new Error('Not authorized')
    const {user: {merchantId}, params: {body}} = req
    const product = await Product.create({...body, merchantId})
    res.json(product)
  } catch (err) {
    next(err)
  }
})
