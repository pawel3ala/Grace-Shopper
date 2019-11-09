const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/cart', require('./cart'))
router.use('/product', require('./product'))
router.use('/order', require('./order'))
router.use('/orderItem', require('./orderItem'))
router.use('/payment', require('./payment'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
