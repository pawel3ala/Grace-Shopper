const router = require('express').Router()
const {
  OrderItem,
  Product,
  CartItems,
  User,
  Order,
  Address
} = require('../db/models')
module.exports = router

// POST api/orderItem (adding item to order)
router.post('/', async (req, res, next) => {
  // edge cases:
  //   -can't order more than what is in stock
  //   -if someone orders something that depletes the stock of a given item, all users with that
  //   item in their cart can't order it

  // body: {orderId, productId, price, qty}
  try {
    // user doesn't matter for orderItems
    const {body} = req
    const orderItem = await OrderItem.create(body)
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  const {orderId} = req.params
  console.log(orderId)
  try {
    const cartItemsPromise = CartItems.findAll({
      where: {orderId},
      raw: true
    })
    const cartItems = await cartItemsPromise
    let userId = cartItems[0].userId
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
          where: {id: userId},
          through: {
            attributes: [],
            where: {orderId}
          }
        }
      ]
    })
    const order = await Order.findByPk(orderId)
    const shipAddressPromise = Address.findByPk(order.get().shipToAddressId)
    const billAddressPromise = Address.findByPk(order.get().billToAddressId)
    const [products, shipToAddress, billToAddress] = [
      await productsPromise,
      await shipAddressPromise,
      await billAddressPromise
    ]
    console.log(order.get().shipToAddressId)
    console.log(shipToAddress.get(), billToAddress.get())
    const cart = products.map(p => ({
      ...p.get(),
      quantity: +cartItems.find(c => c.productId === p.get().productId)
        .quantity,
      orderId: cartItems.find(c => c.productId === p.get().productId).orderId
    }))
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
