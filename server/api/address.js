const router = require('express').Router()
const {Address, User} = require('../db/models')
module.exports = router

// GET api/address (getting user's address from server)
router.get('/', async (req, res, next) => {
  // edge cases:
  //   ???????
  try {
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      const {
        session: {
          address = [
            {type: 'SHIP_TO', guest: true},
            {type: 'BILL_TO', guest: true}
          ]
        }
      } = req
      res.json(address)
    } else {
      const {user} = req
      const address = Address.findAll({
        where: {id: user.id}
      })
      res.json(address)
    }
  } catch (err) {
    next(err)
  }
})

// POST api/address (adding address to model)
router.post('/', async (req, res, next) => {
  // edge cases:
  //   ???????
  try {
    if (!req.user) {
      throw new Error('No!')
    } else {
      const {user: {id: userId}} = req
      const newShipAddress = {...req.body[0], userId}
      const newBillAddress = {...req.body[1], userId}
      const address = await Address.create(newShipAddress)
      const address2 = await Address.create(newBillAddress)
      const addressObj = {address, address2}
      res.json(addressObj)
    }
  } catch (err) {
    next(err)
  }
})

// PUT api/address (updating address details)
router.put('/ship', async (req, res, next) => {
  // edge cases:
  //   ??????????
  try {
    console.log(req.body)
    // const {body: {productId, quantity}} = req
    if (!req.user) {
      throw new Error("Y'ain't s'posed to be here! Go on! Git!")
    } else {
      const {user: {id: userId}} = req
      const {newAddress} = await Address.update({
        where: {userId, type: 'SHIP_TO'},
        returning: true
      })
      if (!newAddress) throw new Error('Address not found')
      res.json(newAddress)
    }
  } catch (err) {
    next(err)
  }
})

// PUT api/address (updating address details)
router.put('/bill', async (req, res, next) => {
  // edge cases:
  //   ??????????
  try {
    console.log(req.body)
    // const {body: {productId, quantity}} = req
    if (!req.user) {
      throw new Error("Y'ain't s'posed to be here! Go on! Git!")
    } else {
      const {user: {id: userId}} = req
      const {newAddress} = await Address.update({
        where: {userId, type: 'BILL_TO'},
        returning: true
      })
      if (!newAddress) throw new Error('Address not found')
      res.json(newAddress)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const {body: {productId}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      req.session.cart = req.session.cart.filter(d => {
        console.log(d.productId, productId)
        return d.productId !== +productId
      })
      res.status(200).end()
    } else {
      const {user: {id: userId}} = req
      let where = {userId}
      if (productId) where.productId = productId
      else throw new Error('No product being deleted.')
      await CartItems.destroy({where})
      res.status(200).end()
    }
  } catch (err) {
    next(err)
  }
})
