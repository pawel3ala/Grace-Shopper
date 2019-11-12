const router = require('express').Router()
const {Order, User, Address, OrderItems} = require('../db/models')
module.exports = router

// POST api/order (adding new order)
router.post('/', async (req, res, next) => {
  // body: {shipToAddressId, billToAddressId, email (based on auth), totalPrice}
  try {
    console.log(req.body)
    const {body: {email, shipAddress, billAddress, totalPrice}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      const strEmail = email[0]
      const [{dataValues: {id: userID}}] = await User.findOrCreate({
        where: {email: strEmail}
      })
      shipAddress.userId = userID
      const userId = userID
      const shipData = await Address.create(shipAddress)
      const shipToAddressId = shipData.dataValues.id
      const billData = await Address.create(billAddress)
      const billToAddressId = billData.dataValues.id
      const order = await Order.create({
        shipToAddressId,
        billToAddressId,
        totalPrice,
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
