const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  cat_name: Sequelize.STRING
})

module.exports = Category
