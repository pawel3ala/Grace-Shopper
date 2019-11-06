import Axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

//Action creators
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

//Reducer
export default (allProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...action.products]
    default:
      return state
  }
})

//Thunks
export const fetchProducts = query => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/products?${query}`)
      dispatch(getProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}
