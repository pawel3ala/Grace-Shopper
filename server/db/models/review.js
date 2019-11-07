const Sequelize = require('sequelize')
const db = require('../db')

// Make sure that we're validating that reviews have a valid productId

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      isLongerThan(value) {
        if (value.length < 12) {
          throw new Error(
            'Review content too short - must have at least 12 characters'
          )
        }
      }
    }
  },
  stars: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  title: {
    type: Sequelize.STRING
  }
})

module.exports = Review
