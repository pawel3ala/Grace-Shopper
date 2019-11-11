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
      const {data} = await Axios.get('/api/address')
      dispatch(getAddress(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const addAnAddress = address => {
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
      console.log('got here')
      if (address.length === 2) {
        const shipAddress = address[0]
        const billAddress = address[1]
        console.log('thunk billAddress', billAddress)
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
