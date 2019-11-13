import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCatalog} from '../store/catalog'
import categoriesReducer, {fetchCategories} from '../store/categories'
import CatalogSidebar from './sidebar'
import {queryParams} from '../../script/helperFuncs'
// import faker from 'faker'

/**
 * COMPONENT
 */

// Creates random Products
// let allProducts = []
// const dummyProducts = () => {
//   for (let i = 0; i < 12; i++) {
//     let newProduct = {
//       id: i,
//       name: `${faker.commerce.productName()}`,
//       quantity: Math.floor(Math.random() * 1000),
//       price: Number(faker.commerce.price(0.1, 1000, 2)),
//       image: faker.image.imageUrl(),
//       description: faker.lorem.paragraph()
//     }
//     //    newProduct.addCategory(faker.random.arrayElement(categories))
//     allProducts.push(newProduct)
//   }
// }
// dummyProducts()

export const Catalog = props => {
  const dispatch = useDispatch()
  const [queryDirty, setQuery] = queryParams()
  const query = JSON.parse(JSON.stringify(queryDirty))

  const getNewData = () => {
    dispatch(fetchCatalog(query))
    dispatch(fetchCategories(query))
  }

  useEffect(
    () => {
      getNewData()
    },
    [queryDirty]
  )

  const catalog = useSelector(({catalog}) => catalog)

  // const sendQuery = () => getNewData()

  return (
    <div>
      <CatalogSidebar />
      <div className="allProducts">
        {catalog.map(product => (
          <div key={product.id}>
            <div className="productDiv">
              <Link to={`/product/${product.id}`}>
                <img className="allProductImg" src={product.image} />
              </Link>
            </div>
            <Link to={`/product/${product.id}`} className="productName">
              <div>{product.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     catalog: state.catalog
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     getAllProducts(query) {
//       dispatch(fetchCatalog(query))
//     }
//   }
// }

// export const Catalog = connect(mapStateToProps, mapDispatchToProps)(
//   CatalogUnconnected
// )
