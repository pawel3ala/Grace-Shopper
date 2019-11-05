const Sequelize = require('sequelize')
const db = require('../db')

const CartItems = db.define('cart', {
  quantity: Sequelize.STRING
})

module.exports = CartItems
