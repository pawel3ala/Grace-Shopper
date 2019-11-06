const router = require('express').Router()
const {CartItems} = require('../db/models')
module.exports = router

// GET api/product
router.get('/', async (req, res, next) => {
  try {
    const cart = await CartItems.findAll({where: {userId: 1}})
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
