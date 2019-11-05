const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: Sequelize.ENUM('PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED')
})

module.exports = Order
