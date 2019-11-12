const router = require('express').Router()
const {User} = require('../db/models')
const {adminValidate} = require('./helpers')
module.exports = router

router.get('/', adminValidate, async (req, res, next) => {
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

// GET logged in user's addresses at /api/users/address
router.get('/address', async (req, res, next) => {
  try {
    const {user} = req
    if (!req.user)
      res
        .status(200)
        .json()
        .end()
    const addresses = await user.getAddresses()
    console.log(addresses)
    res.status(200).json(await user.getAddresses())
  } catch (err) {
    next(err)
  }
})
