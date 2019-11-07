import React from 'react'
import {connect} from 'react-redux'
import {
  fetchProduct,
  addReview,
  editReview,
  editProduct,
  removeProduct
} from '../store/singleProduct'
import faker from 'faker'

let dummyReviews = []
for (let i = 0; i < 3; i++) {
  let contentAmount = Math.floor(Math.random() * 4)
  let newReview = {
    id: i,
    content: faker.lorem.paragraphs(contentAmount),
    stars: Math.ceil(Math.random() * 5),
    title: faker.lorem.sentence(contentAmount + 3)
  }
  dummyReviews.push(newReview)
}
let newProduct = {
  id: 0,
  name: `${faker.commerce.productName()}`,
  quantity: Math.floor(Math.random() * 1000),
  price: Number(faker.commerce.price(0.1, 1000, 2)),
  image: faker.image.imageUrl(),
  description: faker.lorem.paragraph(),
  reviews: dummyReviews
}

class unconnectedSingleProduct extends React.Component {
  componentDidMount() {
    // this.props.fetchProduct(this.props.match.params.productId)
  }
  // eslint-disable-next-line complexity
  render() {
    const name = newProduct.name || ''
    const quantity = newProduct.quantity || ''
    const price = newProduct.price || ''
    const image = newProduct.image || ''
    const description = newProduct.description || ''
    const reviews = newProduct.reviews || []
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
        <form>
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
          {newProduct.reviews.map(review => {
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
    editReview: review => dispatch(editReview(review))
  }
}

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  unconnectedSingleProduct
)
