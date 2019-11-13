const router = require('express').Router()
const {Product, CartItems, User} = require('../db/models')
module.exports = router

router.get('/:orderId', async (req, res, next) => {
  const {orderId} = req.params
  try {
    if (!req.user) {
      throw new Error('Not available for unauthenticated users')
    } else if (req.user.isAdmin) {
      // const orders = await OrderItem.findAll({
      //   where: {
      //     orderId: orderId
      //   }
      // })
      // res.json(orders)
      // do nothing for now
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
        where: {orderId},
        raw: true
      })
      const [products, cartItems] = [
        await productsPromise,
        await cartItemsPromise
      ]
      const cart = products.map(p => ({
        ...p.get(),
        quantity: +cartItems.find(c => c.productId === p.get().productId)
          .quantity,
        orderId: cartItems.find(c => c.productId === p.get().productId).orderId
      }))
      res.json(cart)
    }
  } catch (err) {
    next(err)
  }
})
