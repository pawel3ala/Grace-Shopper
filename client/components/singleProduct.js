import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  fetchProduct,
  addReview,
  editReview,
  editProduct,
  removeProduct
} from '../store/singleProduct'
import {addAnItem} from '../store/cart'

export const SingleProduct = ({history, match: {params: {productId}}}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProduct(productId))
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    const itemObj = {
      productId,
      quantity: event.target.children[0].value
    }
    dispatch(addAnItem(itemObj))
    history.push('/cart')
  }
  // eslint-disable-next-line complexity
  const {name, description, quantity, image, price, reviews = []} = useSelector(
    ({singleProduct}) => singleProduct // state => state.singleProduct
  )
  const productStatus =
    quantity > 20 ? 'In Stock' : quantity > 0 ? 'Low in Stock' : 'Out of Stock'
  return (
    <div className="singleProduct">
      <img src={image} />
      <div className="productInfo">
        <div className="singleProductName">{name}</div>
        <div>Price: ${price}</div>
        <div>Quantity: {productStatus}</div>
        <div>description: {description}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <select name="quantityAddToCart">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <button type="submit">Add to Cart</button>
      </form>
      <div className="productReviewsContainer">
        <div className="reviewsHeader">Reviews</div>
        {reviews.map(review => {
          return (
            <div key={review.id}>
              <div>{review.title}</div>
              <div>{review.content}</div>
              <div>{review.stars}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     product: state.singleProduct
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchProduct: productId => dispatch(fetchProduct(productId)),
//     editProduct: product => dispatch(editProduct(product)), //only for admins(merchants)
//     removeProduct: productId => dispatch(removeProduct(productId)), //only for admins(merchants)
//     addReview: review => dispatch(addReview(review)),
//     editReview: review => dispatch(editReview(review)),
//     addToCart: item => dispatch(addAnItem(item)),
//     fetchCart: () => dispatch(fetchItems())
//   }
// }

// export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
//   unconnectedSingleProduct
// )
