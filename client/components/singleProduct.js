import React from 'react'
import {connect} from 'react-redux'
import {
  fetchProduct,
  addReview,
  editReview,
  editProduct,
  removeProduct
} from '../store/singleProduct'
import {addAnItem, fetchItems} from '../store/cart'
import SingleReview from './singleReview'

class unconnectedSingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      addingTitle: '',
      addingContent: '',
      addingStars: '0'
    }
    this.addReview = this.addReview.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const itemObj = {
      productId: this.props.match.params.productId,
      quantity: event.target.children[0].value
    }
    await this.props.addToCart(itemObj)
    await this.props.fetchCart()
    this.props.history.push('/cart')
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async addReview() {
    await this.props.addReview({
      content: this.state.addingContent,
      title: this.state.addingTitle,
      stars: +this.state.addingStars,
      userId: 1,
      productId: +this.props.match.params.productId
    })
    await this.props.fetchProduct(this.props.match.params.productId)
    this.setState({
      addingContent: '',
      addingTitle: '',
      addingStars: '0'
    })
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
              <SingleReview
                key={review.id}
                review={review}
                editReview={this.props.editReview}
                fetchProduct={this.props.fetchProduct}
                productId={this.props.match.params.productId}
              />
            )
          })}
          <input
            type="text"
            placeholder="Title"
            name="addingTitle"
            value={this.state.addingTitle}
            onChange={this.handleChange}
          />
          <textarea
            placeholder="Content"
            name="addingContent"
            minLength="12"
            value={this.state.addingContent}
            onChange={this.handleChange}
          />
          <input
            type="number"
            min="0"
            max="5"
            name="addingStars"
            value={this.state.addingStars}
            onChange={this.handleChange}
          />
          <button
            type="button"
            disabled={
              this.state.addingContent.length < 12 ||
              this.state.addingTitle.length === 0
            }
            onClick={this.addReview}
          >
            Add Review
          </button>
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
    addToCart: item => dispatch(addAnItem(item)),
    fetchCart: () => dispatch(fetchItems())
  }
}

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  unconnectedSingleProduct
)
