const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart_item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  quantity: Sequelize.STRING,
  price: Sequelize.INTEGER
})

module.exports = CartItem
