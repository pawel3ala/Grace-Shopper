const router = require('express').Router()
const {CartItems, Product, User} = require('../db/models')
module.exports = router

// GET api/cart (getting user's cart from server)
router.get('/', async (req, res, next) => {
  // edge cases:
  //   -can't order more than what is in stock
  //   -if someone orders something that depletes the stock of a given item, all users with that
  //   item in their cart can't order it
  try {
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      const matchingUser = await User.findByPk(1, {include: [Product]})
      const products = matchingUser.products
      let cartItems = await CartItems.findAll(
        {where: {userId: 1}},
        {order: [['productId', 'ASC']]}
      )
      res.json({cartItems, products})
    } else {
      const {user: {id: userId}} = req
      const cartItems = await CartItems.findAll({where: {userId}})
      res.json(cartItems)
    }
  } catch (err) {
    next(err)
  }
})

// POST api/cart (adding item to cart)
router.post('/', async (req, res, next) => {
  // edge cases:
  //   -can't order more than what is in stock
  //   -if someone orders something that depletes the stock of a given item, all users with that
  //   item in their cart can't order it
  try {
    const {body} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      console.log('IS THIS IT?', body.productId)
      const cartItem = await CartItems.create({...body, userId: 1})
      res.json(cartItem)
    } else {
      const {user: {id: userId}} = req
      const cartItem = await CartItems.create({...body, userId})
      res.json(cartItem)
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
    const {body: {productId, ...body}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      const [_, [cart]] = await CartItems.update(body, {
        where: {userId: 1, productId},
        returning: true
      })
      if (!cart) throw new Error('Product not found')
      res.json(cart)
    } else {
      const {user: {id: userId}} = req
      const cart = await CartItems.create({...body, userId})
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    console.log(req)
    const {body: {productId, ...body}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      let where = {userId: 1}
      if (productId) where.productId = productId
      await CartItems.destroy({where})
      res.status(200).end()
    } else {
      const {user: {id: userId}} = req
      let where = {userId}
      if (productId) where.productId = productId
      const cart = await CartItems.destroy({where})
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})
