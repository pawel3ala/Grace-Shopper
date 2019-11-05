const Sequelize = require('sequelize')
const db = require('../db')

const Country = db.define('country', {
  name: Sequelize.STRING,
  continentName: Sequelize.STRING
})

module.exports = Country
