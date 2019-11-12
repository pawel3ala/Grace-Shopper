/* eslint-disable max-statements */
const router = require('express').Router()
const {Order, User, Address, Product} = require('../db/models')
module.exports = router

// POST api/order (adding new order)
router.post('/', async (req, res, next) => {
  // body: {shipToAddressId, billToAddressId, email (based on auth), totalPrice}
  try {
    const {body: {email, shipAddress, billAddress, totalPrice, cart}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      const strEmail = email[0]
      const [{dataValues: {id: userID}}] = await User.findOrCreate({
        where: {email: strEmail},
        defaults: {
          fullName: billAddress.name,
          guestUser: true
        }
      })
      shipAddress.userId = userID
      billAddress.userId = userID
      cart.map(async function(product) {
        const newQuantity = product.productQuantity - product.quantity
        await Product.update(
          {quantity: newQuantity},
          {where: {id: product.productId}}
        )
      })
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
      shipAddress.userId = userId
      billAddress.userId = userId
      let shipToAddressId = shipAddress.id
      let billToAddressId = billAddress.id
      const newShip = await Address.findOrCreate({
        where: {userId, type: 'SHIP_TO'},
        defaults: {...shipAddress}
      })
      if (newShip[0].isNewRecord) {
        shipToAddressId = newShip[0].dataValues.id
      }
      const newBill = await Address.findOrCreate({
        where: {userId, type: 'BILL_TO'},
        defaults: {...billAddress}
      })
      if (newBill[0].isNewRecord) {
        billToAddressId = newBill[0].dataValues.id
      }
      cart.map(async function(product) {
        const newQuantity = product.productQuantity - product.quantity
        await Product.update(
          {quantity: newQuantity},
          {where: {id: product.productId}}
        )
      })
      const order = await Order.create({
        shipToAddressId,
        billToAddressId,
        totalPrice,
        userId,
        status: 'PROCESSING'
      })
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})
