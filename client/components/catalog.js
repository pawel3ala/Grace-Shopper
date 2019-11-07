import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
// import PropTypes from 'prop-types'
// import {auth} from '../store'
import {fetchCatalog} from '../store/catalog'
import faker from 'faker'

/**
 * COMPONENT
 */

// Creates random Products
let allProducts = []
const dummyProducts = () => {
  for (let i = 0; i < 12; i++) {
    let newProduct = {
      id: i,
      name: `${faker.commerce.productName()}`,
      quantity: Math.floor(Math.random() * 1000),
      price: Number(faker.commerce.price(0.1, 1000, 2)),
      image: faker.image.imageUrl(),
      description: faker.lorem.paragraph()
    }
    //    newProduct.addCategory(faker.random.arrayElement(categories))
    allProducts.push(newProduct)
  }
}
dummyProducts()

class CatalogUnconnected extends React.Component {
  constructor() {
    super()
    this.state = {
      query: {
        search: '',
        sort: '',
        price: {},
        review: {},
        page: 0,
        limit: 0,
        category: ''
      }
    }
  }

  componentDidMount() {
    this.props.getAllProducts(this.state.query)
  }

  render() {
    return (
      <div>
        <div className="allProducts">
          {allProducts.map(product => (
            <div key={product.id} className="">
              {product.name}
              <div>
                <NavLink to={`/product/${product.id}`}>
                  <img className="allProductImg" src={product.image} />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapStateToProps = state => {
  return {
    catalog: state.catalog
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts(query) {
      dispatch(fetchCatalog(query))
    }
  }
}

export const Catalog = connect(mapStateToProps, mapDispatchToProps)(
  CatalogUnconnected
)

/**
 * PROP TYPES
 */
// Catalog.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }
