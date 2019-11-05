const Sequelize = require('sequelize')
const db = require('../db')

const Merchant = db.define('merchant', {
  merchant_name: Sequelize.STRING
})

module.exports = Merchant
