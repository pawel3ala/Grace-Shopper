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
      const {session: {cart = []}} = req
      res.json(cart)
    } else {
      const {user} = req
      const productsPromise = Product.findAll({
        attributes: [
          ['id', 'productId'],
          'name',
          'image',
          'price',
          ['quantity', 'productQuantity']
        ],
        // user.getProducts() was returning through table data, so I wrote this to
        // ensure that no extra data gets pulled
        include: [
          {
            model: User,
            attributes: [],
            where: {id: user.id},
            through: {
              attributes: []
            }
          }
        ]
      })
      const cartItemsPromise = CartItems.findAll({
        where: {userId: user.id},
        raw: true
      })
      const [products, cartItems] = [
        await productsPromise,
        await cartItemsPromise
      ]
      const cart = products.map(p => ({
        ...p.get(),
        quantity: +cartItems.find(c => c.productId === p.get().productId)
          .quantity
      }))
      res.json(cart)
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
      if (!req.session.cart) req.session.cart = []
      const newProduct = await Product.findByPk(productId, {
        attributes: [
          ['id', 'productId'],
          'name',
          'image',
          'price',
          ['quantity', 'productQuantity']
        ]
      })
      req.session.cart.push({...newProduct.get(), quantity: +quantity})
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
      console.log(req.session.cart)
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
