const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('order_item', {})

module.exports = OrderItem
