const router = require('express').Router()
const stripeLoader = require('stripe')
require('../../secrets')
module.exports = router

const stripe = new stripeLoader(process.env.STRIPE_SECRET)

const charge = (tokenId, amt) => {
  return stripe.charges.create({
    amount: amt * 100,
    currency: 'usd',
    source: tokenId,
    description: 'Statement Description'
  })
}

// POST api/payment (submitting CC info to Stripe)
router.post('/', async (req, res, next) => {
  // edge cases:
  //   ??????

  try {
    // user doesn't matter for Stripe
    const {body: {token, amount}} = req
    let data = await charge(token.id, amount)
    res.send(data)
  } catch (err) {
    res.send(err)
  }
})
