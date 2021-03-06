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

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/product/${productId}`)
      dispatch(getProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const addReview = review => {
  return async () => {
    try {
      await Axios.post(`/api/product/review`, review)
    } catch (err) {
      console.error(err)
    }
  }
}
export const editReview = review => {
  return async () => {
    try {
      await Axios.put(`/api/product/review/${review.id}`, review)
    } catch (err) {
      console.error(err)
    }
  }
}
export const editProduct = product => {
  return async dispatch => {
    try {
      await Axios.put(`/api/product/${product.id}`, product)
      await dispatch(fetchProduct(product.id)) //update product info without a refresh
    } catch (err) {
      console.error(err)
    }
  }
}
export const removeProduct = productId => {
  return async () => {
    try {
      await Axios.delete(`/api/product/${productId}`)
    } catch (err) {
      console.error(err)
    }
  }
}
