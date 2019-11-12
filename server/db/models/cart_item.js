const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart_item', {
  quantity: Sequelize.STRING,
  price: Sequelize.INTEGER
})

module.exports = CartItem
