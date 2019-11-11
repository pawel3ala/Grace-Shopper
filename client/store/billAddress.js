import Axios from 'axios'

const GET_ADDRESS = 'GET_ADDRESS'

//Action creators
export const getAddress = address => {
  return {
    type: GET_ADDRESS,
    address
  }
}

//Reducer

const billAddressReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ADDRESS:
      return action.address
    default:
      return state
  }
}
export default billAddressReducer

//Thunks
export const fetchBillAddress = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/address/bill')
      dispatch(getAddress(data))
    } catch (err) {
      console.error(err)
    }
  }
}
