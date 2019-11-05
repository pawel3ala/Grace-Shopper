const User = require('./user')
const Address = require('./address')
const Cart = require('./cart')
const Category = require('./category')
const Country = require('./country')
const Merchant = require('./merchant')
const OrderItem = require('./order_item')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Relations between REVIEW and:
Review.belongsTo(User)
Review.belongsTo(Product)

// Relations between CART and:
Cart.belongsTo(User)
Cart.hasMany(Product)

// Relations between CATEGORY and:
Category.hasMany(Product, {through: 'ProductCategory'})

// Relations between COUNTRY and:
Country.belongsTo(Merchant)
Country.belongsTo(User)

// Relations between PRODUCT and:
Product.hasMany(Category, {through: 'ProductCategory'})
Product.hasMany(OrderItem, {through: 'ProductOrderItem'})
Product.hasMany(Cart, {through: 'ProductCart'})
Product.belongsTo(Merchant)

// Relations between ADDRESS and:
Address.belongsTo(User)
Address.hasMany(Order, {through: 'OrderAddress'})
// Address.belongsTo(Country)

// Relations between MERCHANT and:
Merchant.hasMany(Product)
Merchant.hasOne(User)
Merchant.hasOne(Country)

// Relations between ORDER_ITEM and:
// Can we bring this up in code review?
OrderItem.hasMany(Order, {through: 'OrderOrderItem'})
OrderItem.hasMany(Product, {through: 'ProductOrderItem'})

// Relations between ORDER and:
Order.hasMany(OrderItem, {through: 'OrderOrderItem'})
Order.hasMany(Address, {through: 'OrderAddress'})

// Relations between USER and:
User.belongsTo(Merchant)
User.hasMany(Review)
User.hasOne(Cart)
User.hasOne(Country)
User.hasMany(Address)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Address,
  Cart,
  Category,
  Country,
  Merchant,
  OrderItem,
  Order,
  Product,
  Review
}
