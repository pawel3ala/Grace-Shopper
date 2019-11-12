import Axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

//Action creators
export const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

//Reducer
const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
export default ordersReducer

//Thunks
export const fetchOrders = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/order')
      dispatch(getOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}
