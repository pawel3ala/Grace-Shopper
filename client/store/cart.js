import Axios from 'axios'

const GET_ITEMS = 'GET_ITEMS'
const CLEAR_ITEMS = 'CLEAR_ITEMS'

//Action creators
export const getItems = items => {
  return {
    type: GET_ITEMS,
    items
  }
}
export const clearItems = () => {
  return {
    type: CLEAR_ITEMS,
    items: {}
  }
}

//Reducer

const initialState = {
  cartItems: [],
  products: []
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return action.items
    case CLEAR_ITEMS:
      return action.items
    default:
      return state
  }
}
export default cartReducer

//Thunks
export const fetchItems = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/cart')
      dispatch(getItems(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const addAnItem = item => {
  return async () => {
    try {
      await Axios.post('/api/cart', item)
    } catch (err) {
      console.error(err)
    }
  }
}
export const deleteItem = item => {
  return async () => {
    try {
      await Axios.delete(`/api/cart`, {data: item})
    } catch (err) {
      console.error(err)
    }
  }
}
export const changeItem = item => {
  return async () => {
    try {
      await Axios.put(`/api/cart`, item)
    } catch (err) {
      console.error(err)
    }
  }
}
export const clearAllItems = () => {
  return async dispatch => {
    try {
      await Axios.delete(`/api/cart`, {})
      dispatch(clearAllItems())
    } catch (err) {
      console.error(err)
    }
  }
}
