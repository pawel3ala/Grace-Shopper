const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  quantity: Sequelize.STRING
})

module.exports = Cart
