const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

// POST api/order (adding new order)
router.post('/', async (req, res, next) => {
  // body: {shipToAddressId, bill, email (based on auth), orderPrice}
  try {
    const {body: {email, ...body}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      const user = await User.findOrCreate({where: {}})
      const cartItem = await Order.create({...body, userId: 1})
      res.json(cartItem)
    } else {
      const {user: {id: userId}} = req
      const cartItem = await Order.create({...body, userId})
      res.json(cartItem)
    }
  } catch (err) {
    next(err)
  }
})
