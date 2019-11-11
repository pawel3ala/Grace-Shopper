const router = require('express').Router()
const {User} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const {body: {email, password}, session: {cart}} = req
    const user = await User.findOne({where: {email}})
    if (cart && cart.length) {
      const userCart = await user.getProducts()
      const newItems = cart.filter(c => !userCart.includes(c))
      await Promise.all(
        newItems.map(({productId, quantity}) =>
          user.addProduct(productId, {through: {quantity}})
        )
      )
    }
    if (!user) {
      console.log('No such user found:', email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {body, session: {cart}} = req
    const user = await User.create(body)
    if (cart && cart.length) {
      await Promise.all(
        cart.map(({productId, quantity}) =>
          user.addProduct(productId, {through: {quantity}})
        )
      )
    }
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
