const User = require('./user')
const Address = require('./address')
const CartItems = require('./cart_item')
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
// CartItems.belongsTo(User)
// CartItems.hasMany(Product)

// Relations between CATEGORY and:
Category.belongsToMany(Product, {through: 'ProductCategory'})

// Relations between COUNTRY and:
Country.belongsTo(Merchant)
Country.belongsTo(User)

// Relations between PRODUCT and:
Product.belongsToMany(Category, {through: 'ProductCategory'})
Product.belongsToMany(Order, {through: OrderItem})
Product.belongsToMany(User, {through: CartItems})
Product.belongsTo(Merchant)
Product.hasMany(Review)

// Relations between ADDRESS and:
Address.belongsTo(User)
Address.belongsToMany(Order, {through: 'OrderAddress'})
// Address.belongsTo(Country)

// Relations between MERCHANT and:
Merchant.hasMany(Product)
Merchant.hasOne(User)
Merchant.hasOne(Country)

// Relations between ORDER_ITEM and:
// Can we bring this up in code review?
// OrderItem.belongsToMany(Order, {through: 'OrderOrderItem'})
// OrderItem.belongsToMany(Product, {through: 'ProductOrderItem'})

// Relations between ORDER and:
Order.belongsToMany(Product, {through: OrderItem})
Order.hasOne(Address, {as: 'shipToAddress'})
Order.hasOne(Address, {as: 'billToAddress'})
Order.hasOne(User)

// Relations between USER and:
User.belongsTo(Merchant)
User.hasMany(Review)
User.belongsToMany(Product, {through: CartItems})
User.hasOne(Country)
User.hasMany(Address)
User.belongsTo(Order)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Address,
  CartItems,
  Category,
  Country,
  Merchant,
  OrderItem,
  Order,
  Product,
  Review
}
