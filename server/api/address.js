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
    console.log(req)
    const {body: {productId, quantity}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      req.session.address.push({})
      res.json(req.session.address)
    } else {
      const {user: {id: userId}} = req
      const address = await Address.create({productId, quantity, userId})
      res.json(address)
    }
  } catch (err) {
    next(err)
  }
})

// PUT api/cart (updating cart quantity)
router.put('/', async (req, res, next) => {
  // edge cases:
  //   -can't order more than what is in stock
  //   -if someone orders something that depletes the stock of a given item, all users with that
  //   item in their cart can't order it
  try {
    const {body: {productId, quantity}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      req.session.cart.find(d => d.productId === +productId).quantity = quantity
      res.json(req.session.cart)
    } else {
      const {user: {id: userId}} = req
      const [_, [cartItem]] = await CartItems.update(
        {quantity},
        {
          where: {userId, productId},
          returning: true
        }
      )
      if (!cartItem) throw new Error('Product not found')
      res.json(cartItem)
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
