const Op = require('sequelize').Op
const {Category} = require('../db/models')

const operatorAliases = {
  lt: Op.lt,
  lte: Op.lte,
  gt: Op.gt,
  gte: Op.gte
}

const getProductQuery = query => {
  const {search, price, review, category} = query
  let where = {}
  let include = [
    {model: Category, attributes: ['name'], through: {attributes: []}}
  ]
  // if category is on the query, it will add a where clause to the include, otherwise just include
  // all categories
  if (search)
    where[Op.or] = {
      // do we want this to be name or description OR just name
      name: {[Op.iLike]: `%${search}%`},
      description: {[Op.iLike]: `%${search}%`}
    }
  if (category) include[0].where = {name: category}
  // do we want multi-category filtering?
  if (price) {
    where.price = {}
    for (let k of Object.keys(price)) where.price[operatorAliases[k]] = price[k]
  }
  // extra (not in user stories)
  if (review) {
    where.review = {}
    for (let k of Object.keys(review))
      where.review[operatorAliases[k]] = review[k]
  }
  return {where, include}
}

const adminValidate = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    throw new Error('User needs admin privileges')
  }
}

module.exports = {getProductQuery, adminValidate}
