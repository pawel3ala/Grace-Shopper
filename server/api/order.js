const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

// POST api/order (adding new order)
router.post('/', async (req, res, next) => {
  // body: {shipToAddressId, billToAddressId, email (based on auth), totalPrice}
  try {
    const {body: {email, ...body}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      const [{dataValues: {id: userId}}] = await User.findOrCreate({
        where: {email}
      })
      const order = await Order.create({
        ...body,
        userId,
        status: 'PROCESSING'
      })
      res.json(order)
    } else {
      const {user: {id: userId}} = req
      const order = await Order.create({...body, userId, status: 'PROCESSING'})
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})
