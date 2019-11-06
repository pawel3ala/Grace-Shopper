const Op = require('sequelize').Op

const operatorAliases = {
  lt: Op.lt,
  lte: Op.lte,
  gt: Op.gt,
  gte: Op.gte
}

const getProductQuery = query => {
  // the function expects:
  // name will be a case insensitive substring search
  // fuelType will be an exact string search
  // fuelLevel will have some kind of LHS operators attached to it (e.g fuelLevel[lte])
  const {search, price, review, category} = query
  let where = {}
  if (search)
    where[Op.or] = {
      // do we want this to be name or description OR just name
      name: {[Op.iLike]: `%${search}%`},
      description: {[Op.iLike]: `%${search}%`}
    }
  if (category) where.category = category
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
  return where
}

module.exports = {getProductQuery}
