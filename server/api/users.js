const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.use((req, res, next) => {
  // console.log('req.session', req.session)
  // console.log('req.user', req.user)
  if (!req.session.cartItems) {
    req.session.cartItems = []
  } else {
    req.session.cartItems.push({
      productId: Math.floor(Math.random() * 100),
      quantity: Math.floor(Math.random() * 10)
    })
  }
  console.log('req.session.cartItems', req.session.cartItems)
  next()
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
