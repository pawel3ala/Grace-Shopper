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

const addressReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ADDRESS:
      return action.address
    default:
      return state
  }
}
export default addressReducer

//Thunks
export const fetchAddress = () => {
  return async dispatch => {
    try {
      const {data} = await Axios.get('/api/users/address')
      dispatch(getAddress(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const addAddress = address => {
  return async () => {
    try {
      await Axios.post('/api/address', address)
    } catch (err) {
      console.error(err)
    }
  }
}
export const deleteItem = address => {
  return async () => {
    try {
      await Axios.delete(`/api/address`, address)
    } catch (err) {
      console.error(err)
    }
  }
}
export const changeAddress = address => {
  return async () => {
    try {
      if (address.length === 2) {
        const shipAddress = address[0]
        const billAddress = address[1]
        await Axios.put(`/api/address/ship`, shipAddress)
        await Axios.put(`/api/address/bill`, billAddress)
      } else if (address[0].type === 'SHIP_TO') {
        await Axios.put(`/api/address/ship`, address[0])
      } else {
        await Axios.put(`/api/address/bill`, address[0])
      }
    } catch (err) {
      console.error(err)
    }
  }
}
