import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems,
  createOrderItem
} from '../store/cart'
import {
  fetchAddress,
  changeAddress,
  getAddress,
  addAddress
} from '../store/address'
import CheckoutForm from './checkoutForm'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {StripeProvider, Elements} from 'react-stripe-elements'
import {Grid} from 'semantic-ui-react'

class unconnectedCheckout extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchItems()
    this.props.fetchAddress()
  }
  async handleChange(event) {
    const productId = event.target.name
    const quantity = Number(event.target.value)
    const itemObj = {
      productId,
      quantity
    }
    await this.props.changeItem(itemObj)
    this.props.fetchItems()
  }
  render() {
    let cartAll
    this.props.cart === undefined
      ? (cartAll = [0])
      : (cartAll = this.props.cart)
    let cart = cartAll.filter(cartItem => cartItem.orderId === null)
    const cartCount = cart.reduce((accum, currentVal) => {
      accum += currentVal.quantity
      return accum
    }, 0)
    const orderTotal = cart.reduce((accum, currentVal) => {
      const itemSubtotal = currentVal.quantity * currentVal.price
      accum += itemSubtotal
      return accum
    }, 0)
    const displayOrderTotal = String(orderTotal)
    return (
      <div>
        <Grid padded centered>
          <Grid.Row as="h1" style={{paddingRight: '5rem'}}>
            Checkout (<Link to="/cart">{cartCount} items</Link>)
          </Grid.Row>
        </Grid>
        <br />
        <StripeProvider apiKey="pk_test_FjmwUNWUX5OIG2L1aadq9nkM00e6PJNafA">
          <Elements>
            <CheckoutForm
              cart={cart}
              user={this.props.user}
              createOrderItem={this.props.createOrderItem}
              orderTotal={displayOrderTotal}
              addAddress={this.props.addAddress}
              getAddress={this.props.getAddress}
              changeAddress={this.props.changeAddress}
              addresses={this.props.addresses}
            />
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    addresses: state.address,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    addToCart: item => dispatch(addAnItem(item)),
    deleteItem: item => dispatch(deleteItem(item)),
    changeItem: item => dispatch(changeItem(item)),
    createOrderItem: orderItem => dispatch(createOrderItem(orderItem)),
    clearCart: () => dispatch(clearAllItems()),
    getAddress: address => dispatch(getAddress(address)),
    addAddress: address => dispatch(addAddress(address)),
    fetchAddress: () => dispatch(fetchAddress()),
    changeAddress: address => dispatch(changeAddress(address))
  }
}

export const Checkout = connect(mapStateToProps, mapDispatchToProps)(
  unconnectedCheckout
)
