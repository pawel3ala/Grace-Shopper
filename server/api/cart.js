const router = require('express').Router()
const {CartItems, Product} = require('../db/models')
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
      const {
        session: {
          cart = {
            cartItems: [],
            products: []
          }
        }
      } = req
      res.json(cart)
    } else {
      const {user} = req
      const products = user.getProducts()
      const cartItems = await CartItems.findAll({
        where: {userId: user.id}
      })
      res.json({cartItems})
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
    const {body: {productId, quantity}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      if (!req.session.cart) req.session.cart = {cartItems: [], products: []}
      req.session.cart.cartItems.push({productId, quantity})
      req.session.cart.products.push(await Product.findByPk(productId))
      res.json(req.session.cart)
    } else {
      const {user: {id: userId}} = req
      const cartItem = await CartItems.create({productId, quantity, userId})
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
    const {body: {productId, quantity}} = req
    if (!req.user) {
      // handle unauthenticated user w/ cookie
      req.session.cart.cartItems.find(
        d => d.productId === productId
      ).quantity = quantity
      res.json(req.session.cart)
    } else {
      const {user: {id: userId}} = req
      const [_, [cart]] = await CartItems.update(
        {productId, quantity},
        {
          where: {userId, productId},
          returning: true
        }
      )
      if (!cart) throw new Error('Product not found')
      res.json(cart)
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
      console.log(req.session.cart)
      req.session.cart.cartItems = req.session.cart.cartItems.filter(
        d => d.productId !== productId
      )
      res.status(200).end()
    } else {
      const {user: {id: userId}} = req
      let where = {userId}
      if (productId) where.productId = productId
      const cart = await CartItems.destroy({where})
      res.status(200).end()
    }
  } catch (err) {
    next(err)
  }
})
