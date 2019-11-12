const router = require('express').Router()
const {Order, User, Address, Product} = require('../db/models')
module.exports = router

// POST api/order (adding new order)
router.post('/', async (req, res, next) => {
  // body: {shipToAddressId, billToAddressId, email (based on auth), totalPrice}
  try {
    const {body: {email, shipAddress, billAddress, totalPrice}} = req
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
      this.props.cart.map(async function(product) {
        console.log(product)
        const quantity = product.productQuantity - product.quantity
        await Product.update(`/${product.productId}/orderQty`, {quantity})
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
      //NEED TO FINDORCREATE ADDRESS FOR NEW USER
      const {user: {id: userId}} = req
      shipAddress.userId = userId
      billAddress.userId = userId
      const newShip = await Address.findOrCreate({
        where: {userId, type: 'SHIP_TO'},
        defaults: {...shipAddress}
      })
      console.log('newShip', newShip)
      const newBill = await Address.findOrCreate({
        where: {userId, type: 'BILL_TO'},
        defaults: {...billAddress}
      })
      const shipToAddressId = shipAddress.id
      const billToAddressId = billAddress.id
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
