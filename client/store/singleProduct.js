import Axios from 'axios'

const GET_PRODUCT = 'GET_PRODUCT'

//Action Creator
export const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

//Reducer
const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
export default singleProductReducer
//Thunk

export const addReview = review => {
  return async () => {
    try {
      await Axios.post(`/api/review`, review)
    } catch (err) {
      console.error(err)
    }
  }
}
export const editProduct = product => {
  return async () => {
    try {
      await Axios.put(`/api/products/${product.id}`, product)
    } catch (err) {
      console.error(err)
    }
  }
}
export const removeProduct = product => {
  return async () => {
    try {
      await Axios.delete(`/api/products/${product.id}`)
    } catch (err) {
      console.error(err)
    }
  }
}
export const editReview = review => {
  return async () => {
    try {
      await Axios.put(`/api/review/${review.id}`, review)
    } catch (err) {
      console.error(err)
    }
  }
}
