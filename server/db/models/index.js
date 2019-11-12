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
const db = require('../db')

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
Category.belongsToMany(Product, {
  through: 'ProductCategory',
  foreignKeyConstraint: true
})
// Category.hasMany(db.models.ProductCategory)

// Relations between COUNTRY and:
Country.hasMany(Merchant)
Country.hasMany(User)

// Relations between PRODUCT and:
Product.belongsToMany(Category, {
  through: 'ProductCategory',
  foreignKeyConstraint: true
})
Product.belongsToMany(Order, {through: OrderItem, foreignKeyConstraint: true})
Product.belongsToMany(User, {through: CartItems, foreignKeyConstraint: true})
Product.belongsTo(Merchant)
Product.hasMany(Review)

// db.models.ProductCategory.belongsTo(Product)

// Relations between ADDRESS and:
Address.belongsTo(User)
// Address.hasMany(Order)
// Address.belongsTo(Country)

// Relations between MERCHANT and:
Merchant.hasMany(Product)
Merchant.hasOne(User)
Merchant.belongsTo(Country)

// Relations between ORDER_ITEM and:
// Can we bring this up in code review?
// OrderItem.belongsToMany(Order, {through: 'OrderOrderItem'})
// OrderItem.belongsToMany(Product, {through: 'ProductOrderItem'})

// Relations between ORDER and:
Order.belongsTo(Address, {as: 'shipToAddress'})
Order.belongsTo(Address, {as: 'billToAddress'})
Order.belongsTo(User)
Order.belongsToMany(Product, {through: OrderItem, foreignKeyConstraint: true})

// Relations between USER and:
User.belongsTo(Merchant)
User.hasMany(Review)
User.belongsToMany(Product, {through: CartItems, foreignKeyConstraint: true})
User.belongsTo(Country)
User.hasMany(Address)
User.hasMany(Order)

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
