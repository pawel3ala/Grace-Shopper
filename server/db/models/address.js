const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  name: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: Sequelize.INTEGER,
  type: Sequelize.ENUM('BILL_TO', 'SHIP_TO', 'BOTH')
})

module.exports = Address
