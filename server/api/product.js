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
  const {params: {productId}} = req
  try {
    const product = await Product.findByPk(productId, {include: [Review]})
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// PUT api/product/:productId
router.put('/:productId', async (req, res, next) => {
  const {params: {productId}, body} = req
  try {
    const [_, [product]] = await Product.update(body, {
      where: {id: productId},
      returning: true
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// POST api/product/:productId/review
router.post('/:productId/review', async (req, res, next) => {
  const {params: {productId}, body} = req
  try {
    const review = await Review.create(body, {
      where: {id: productId}
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.post('/:productId/review/:reviewId', async (req, res, next) => {
  const {params: {reviewId}, body} = req
  try {
    const review = await Review.update(body, {
      where: {id: reviewId}
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})
