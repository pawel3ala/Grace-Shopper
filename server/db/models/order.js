const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: Sequelize.ENUM('PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED'),
  totalPrice: Sequelize.FLOAT
})

module.exports = Order
