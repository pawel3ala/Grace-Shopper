import Axios from 'axios'

const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

//Action creators
export const getSingleOrder = singleOrder => {
  return {
    type: GET_SINGLE_ORDER,
    singleOrder
  }
}

//Reducer
const singleOrderReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SINGLE_ORDER:
      return action.singleOrder
    default:
      return state
  }
}
export default singleOrderReducer

//Thunks
export const fetchSingleOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/orderItem/${orderId}`)
      dispatch(getSingleOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}
