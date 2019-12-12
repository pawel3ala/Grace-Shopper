import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCatalog} from '../store/catalog'
import categoriesReducer, {fetchCategories} from '../store/categories'
import CatalogSidebar from './sidebar'
import {queryParams} from '../../script/helperFuncs'
import debounce from 'lodash.debounce'
import {Sidebar, Grid, Container, Button, Icon} from 'semantic-ui-react'
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
  const getData = debounce(getNewData, 250, {trailing: true})

  useEffect(
    () => {
      getData()
      return getData.cancel
    },
    [queryDirty]
  )

  const catalog = useSelector(({catalog}) => catalog)

  // const sendQuery = () => getNewData()

  return (
    <Sidebar.Pushable style={{height: '70vh'}}>
      <div className="allProductsContainer">
        <div className="sidebar">
          <CatalogSidebar style={{position: 'fixed'}} />
        </div>
        <div className="sidebarDiv" />
        <div className="allProductsDiv">
          <Sidebar.Pusher as={Grid} className="allProducts">
            {catalog.map(product => (
              <Grid.Column width={3} key={product.id}>
                <div className="productDiv">
                  <Link to={`/product/${product.id}`}>
                    <img className="allProductImg" src={product.image} />
                  </Link>
                </div>
                <Link to={`/product/${product.id}`} className="productName">
                  <div>{product.name}</div>
                </Link>
              </Grid.Column>
            ))}
            <Container>
              <Button
                disabled={query.page === 1}
                floated="left"
                onClick={() => setQuery({page: query.page - 1})}
              >
                <Icon name="backward" />
              </Button>
              <Button
                disabled={catalog.length < query.limit}
                floated="right"
                onClick={() => setQuery({page: query.page + 1})}
              >
                <Icon name="forward" />
              </Button>
            </Container>
          </Sidebar.Pusher>
        </div>
      </div>
    </Sidebar.Pushable>
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
