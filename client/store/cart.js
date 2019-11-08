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
      data.products.sort(
        (a, b) => a.cart_item.productId - b.cart_item.productId
      )
      data.cartItems.sort((a, b) => a.productId - b.productId) //Need to sort so product matches up with correct cart item
      let info = []
      for (let i = 0; i < data.products.length; i++) {
        info.push({
          //Only grab needed info for each cart item
          id: i + 1,
          quantity: data.cartItems[i].quantity,
          productId: data.cartItems[i].productId,
          name: data.products[i].name,
          image: data.products[i].image,
          price: data.products[i].price,
          productQuantity: data.products[i].quantity
        })
      }
      dispatch(getItems(info))
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
