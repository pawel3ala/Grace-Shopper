const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {})

module.exports = Category
