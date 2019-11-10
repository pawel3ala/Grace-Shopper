import Axios from 'axios'
import {getUrlString} from '../../script/helperFuncs'

const initialState = {
  page: 1,
  limit: 10,
  order: 'id.ASC'
}

const GET_PRODUCTS = 'GET_PRODUCTS'

//Action creators
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

//Reducer
const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
export default queryReducer

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
