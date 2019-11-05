const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: Sequelize.STRING,
  quantity: Sequelize.INTEGER,
  price: Sequelize.FLOAT,
  //   status: Sequelize.ENUM('OUT_OF_STOCK', 'IN_STOCK', 'RUNNING_LOW'),
  image: Sequelize.STRING,
  description: Sequelize.TEXT
})

module.exports = Product
