const router = require('express').Router()
const {OrderItem} = require('../db/models')
module.exports = router

// POST api/orderItem (adding item to order)
router.post('/', async (req, res, next) => {
  // edge cases:
  //   -can't order more than what is in stock
  //   -if someone orders something that depletes the stock of a given item, all users with that
  //   item in their cart can't order it

  // body: {orderId, productId, price, qty}
  try {
    // user doesn't matter for orderItems
    const {body} = req
    const orderItem = await OrderItem.create(body)
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})
