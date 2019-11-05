const Sequelize = require('sequelize')
const db = require('../db')

const Country = db.define('country', {})

module.exports = Country
