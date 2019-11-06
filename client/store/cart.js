import Axios from 'axios'

const ADD_ITEM = 'ADD_ITEM'
const GET_ITEMS = 'GET_ITEMS'
const CLEAR_ITEMS = 'CLEAR_ITEMS'

//Action creators
export const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  }
}
export const getItems = items => {
  return {
    type: GET_ITEMS,
    items
  }
}
export const clearItems = () => {
  return {
    type: CLEAR_ITEMS,
    items: []
  }
}

//Reducer

const cartReducer = (action, state = []) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    case GET_ITEMS:
      return [...action.items]
    case CLEAR_ITEMS:
      return [action.items]
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
export const deleteItem = item => {
  return async () => {
    try {
      await Axios.delete(`/api/cart`, item)
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
  return async () => {
    try {
      await Axios.delete(`/api/cart`, {})
    } catch (err) {
      console.error(err)
    }
  }
}
