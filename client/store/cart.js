import Axios from 'axios'

const initialState = []

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
    items: initialState
  }
}

//Reducer

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
  return async dispatch => {
    try {
      await Axios.post('/api/cart', item)
      dispatch(fetchItems())
    } catch (err) {
      console.error(err)
    }
  }
}
export const deleteItem = item => {
  return async dispatch => {
    try {
      // axios delete requires an object with the key of data to pass in a body to the request
      await Axios.delete(`/api/cart`, {data: item})
      dispatch(fetchItems())
    } catch (err) {
      console.error(err)
    }
  }
}
export const changeItem = item => {
  return async () => {
    try {
      await Axios.put(`/api/cart`, item)
      fetchItems()
    } catch (err) {
      console.error(err)
    }
  }
}
export const clearAllItems = () => {
  return async dispatch => {
    try {
      // axios delete requires an object with the key of data to pass in a body to the request
      await Axios.delete(`/api/cart`, {data: {}})
      dispatch(clearAllItems())
    } catch (err) {
      console.error(err)
    }
  }
}
