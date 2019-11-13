const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  name: {
    type: Sequelize.STRING
  },
  street1: {
    type: Sequelize.STRING
  },
  street2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: Sequelize.STRING,
  type: Sequelize.ENUM('BILL_TO', 'SHIP_TO'),
  default: Sequelize.BOOLEAN
})

module.exports = Address
