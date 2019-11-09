import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {fetchAddress, changeAddress} from '../store/address'
import CheckoutForm from './checkoutForm'
import {connect} from 'react-redux'
import {StripeProvider, Elements} from 'react-stripe-elements'

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
  handleOrder() {
    // this.props.createOrder()
    // this.props.fetchOrder()
    // this.props.setOrderItems()
    this.props.clearCart()
  }
  render() {
    let cart
    this.props.cart === undefined ? (cart = [0]) : (cart = this.props.cart)
    const cartCount = cart.reduce((accum, currentVal) => {
      accum += currentVal.quantity
      return accum
    }, 0)
    const orderTotal = cart.reduce((accum, currentVal) => {
      accum += currentVal.total
      return accum
    }, 0)
    // const displayOrderTotal = String(orderTotal)
    const displayOrderTotal = String(234)
    return (
      <div>
        <div id="checkoutHeader">
          <h1>Checkout ({cartCount} items)</h1>
        </div>
        <br />
        <div>
          <StripeProvider apiKey="pk_test_FjmwUNWUX5OIG2L1aadq9nkM00e6PJNafA">
            <Elements>
              <CheckoutForm
                address="this.props.address"
                orderTotal={displayOrderTotal}
                changeAddress={this.props.changeAddress}
                fetchAddress={this.props.fetchAddress}
                clearCart={this.props.clearCart}
              />
            </Elements>
          </StripeProvider>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    address: state.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    addToCart: item => dispatch(addAnItem(item)),
    deleteItem: item => dispatch(deleteItem(item)),
    changeItem: item => dispatch(changeItem(item)),
    clearCart: () => dispatch(clearAllItems()),
    fetchAddress: () => dispatch(fetchAddress()),
    changeAddress: address => dispatch(changeAddress(address))
  }
}

export const Checkout = connect(mapStateToProps, mapDispatchToProps)(
  unconnectedCheckout
)
