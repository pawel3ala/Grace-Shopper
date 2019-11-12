import Axios from 'axios'
import {getUrlString} from '../../script/helperFuncs'

const [GET_PRODUCTS, GET_CATEGORIES] = ['GET_PRODUCTS', 'GET_CATEGORIES']

//Action creators
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

//Reducer
const catalogReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
export default catalogReducer

//Thunks
export const fetchCatalog = query => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/product?${getUrlString(query)}`)
      dispatch(getProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}
