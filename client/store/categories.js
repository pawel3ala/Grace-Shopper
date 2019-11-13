import Axios from 'axios'
import {getUrlString} from '../../script/helperFuncs'

const GET_CATEGORIES = 'GET_CATEGORIES'

//Action creators
export const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

//Reducer
const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
export default categoriesReducer

//Thunks
export const fetchCategories = query => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(
        `/api/product/category?${getUrlString(query)}`
      )
      dispatch(getCategories(data))
    } catch (err) {
      console.error(err)
    }
  }
}
