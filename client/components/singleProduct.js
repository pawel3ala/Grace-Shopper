import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  fetchProduct,
  addReview,
  editProduct,
  removeProduct
} from '../store/singleProduct'
import {addAnItem, fetchItems} from '../store/cart'
import SingleReview from './singleReview'
import AddReview from './addReview'
import {getAverageRating} from '../../script/helperFuncs'

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

  const postReview = review => {
    dispatch(
      addReview({
        content: review.content,
        title: review.title,
        stars: review.stars,
        productId: +productId
      })
    )
  }

  // eslint-disable-next-line complexity
  const {name, description, quantity, image, price, reviews = []} = useSelector(
    ({singleProduct}) => singleProduct // state => state.singleProduct
  )
  const userId = useSelector(({user}) => user.id)

  const productStatus =
    quantity > 20 ? 'In Stock' : quantity > 0 ? 'Low in Stock' : 'Out of Stock'
  return (
    <div className="singleProduct">
      <img src={image} />
      <div className="productInfo">
        <div className="singleProductName">{name}</div>
        <div>
          Rating:{' '}
          {getAverageRating(reviews) > 0
            ? getAverageRating(reviews)
            : 'No reviews'}
        </div>
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
            <SingleReview
              key={review.id}
              review={review}
              productId={+productId}
              userId={userId}
            />
          )
        })}
        {userId ? <AddReview addReview={postReview} /> : null}
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
