const Sequelize = require('sequelize')
const db = require('../db')

const Merchant = db.define('merchant', {
  merchantName: Sequelize.STRING
})

module.exports = Merchant
