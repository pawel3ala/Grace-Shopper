import React from 'react'
import {connect} from 'react-redux'
import {
  fetchProduct,
  addReview,
  editReview,
  editProduct,
  removeProduct
} from '../store/singleProduct'
import {addAnItem} from '../store/cart'

class unconnectedSingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId)
  }

  handleSubmit(event) {
    event.preventDefault()
    const itemObj = {
      productId: this.props.match.params.productId,
      quantity: event.target.children[0].value
    }
    this.props.addToCart(itemObj)
    this.props.history.push('/cart')
  }
  // eslint-disable-next-line complexity
  render() {
    const name = this.props.product.name || ''
    const quantity = this.props.product.quantity || ''
    const price = this.props.product.price || ''
    const image = this.props.product.image || ''
    const description = this.props.product.description || ''
    const reviews = this.props.product.reviews || []
    let productStatus =
      quantity > 20
        ? 'In Stock'
        : quantity > 0 ? 'Low in Stock' : 'Out of Stock'
    return (
      <div className="singleProduct">
        <img src={image} />
        <div className="productInfo">
          <div className="singleProductName">{name}</div>
          <div>Price: ${price}</div>
          <div>Quantity: {productStatus}</div>
          <div>description: {description}</div>
        </div>
        <form onSubmit={() => this.handleSubmit(event)}>
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
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => dispatch(fetchProduct(productId)),
    editProduct: product => dispatch(editProduct(product)), //only for admins(merchants)
    removeProduct: productId => dispatch(removeProduct(productId)), //only for admins(merchants)
    addReview: review => dispatch(addReview(review)),
    editReview: review => dispatch(editReview(review)),
    addToCart: item => dispatch(addAnItem(item))
  }
}

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  unconnectedSingleProduct
)
