const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {})

module.exports = Address
