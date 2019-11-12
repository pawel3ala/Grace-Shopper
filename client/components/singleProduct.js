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
import AddReview from './addReview'
import {getAverageRating, priceFormat} from '../../script/helperFuncs'
import {Grid, Image, Rating} from 'semantic-ui-react'

class unconnectedSingleProduct extends React.Component {
  constructor() {
    super()
    this.addReview = this.addReview.bind(this)
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

  async addReview(review) {
    await this.props.addReview({
      content: review.content,
      title: review.title,
      stars: review.stars,
      productId: +this.props.match.params.productId
    })
    await this.props.fetchProduct(this.props.match.params.productId)
  }

  // eslint-disable-next-line complexity
  render() {
    console.log(this.props.user)
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
    let averageRating = getAverageRating(reviews)
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={5}>
            <Image src={image} rounded bordered />
          </Grid.Column>
          <Grid.Column width={5}>
            <Grid.Row as="h2">{name}</Grid.Row>
            <Grid.Row style={{paddingTop: '0.5em'}}>
              Rating:{' '}
              {/*Need key prop to force Rating component to re render after data is fetched */}
              {getAverageRating(reviews) > 0 ? (
                <Rating
                  key={averageRating}
                  defaultRating={averageRating}
                  icon="star"
                  maxRating={5}
                  disabled
                />
              ) : (
                'No reviews'
              )}
            </Grid.Row>
            <Grid.Row style={{paddingTop: '0.5em'}}>
              Price: {priceFormat(price)}
            </Grid.Row>
            <Grid.Row style={{paddingTop: '0.5em'}}>
              Quantity: {productStatus}
            </Grid.Row>
            <Grid.Row style={{paddingTop: '0.5em'}}>
              Description: {description}
            </Grid.Row>
            <Grid.Row style={{paddingTop: '3.5em'}}>
              <form onSubmit={() => this.handleSubmit(event)}>
                <select name="quantityAddToCart">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                <button type="submit">Add to Cart</button>
              </form>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row as="h2"> Reviews</Grid.Row>
        {reviews.map(review => {
          return (
            <SingleReview
              key={review.id}
              review={review}
              editReview={this.props.editReview}
              fetchProduct={this.props.fetchProduct}
              productId={this.props.match.params.productId}
              userId={this.props.user.id}
            />
          )
        })}
        {this.props.user.id ? <AddReview addReview={this.addReview} /> : null}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
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
