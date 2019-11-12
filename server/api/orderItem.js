const router = require('express').Router()
const {OrderItem, Product} = require('../db/models')
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

router.get('/:orderId', async (req, res, next) => {
  const {orderId} = req.params
  try {
    if (!req.user) {
      throw new Error('Not available for unauthenticated users')
    } else if (req.user.isAdmin) {
      const orders = await OrderItem.findAll({
        where: {
          orderId: orderId
        }
      })
      res.json(orders)
    } else {
      const {user} = req
      const orderItems = await OrderItem.findAll({
        where: {
          // TODO: check if api is used by legit user
          // so that nobody except admin, can view orders of differnet users
          orderId: orderId
        }
      })
      res.json(orderItems)
    }
  } catch (err) {
    next(err)
  }
})
