import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {
  fetchAddress,
  changeAddress,
  getAddress,
  addAddress
} from '../store/address'
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
      const itemSubtotal = currentVal.quantity * currentVal.price
      accum += itemSubtotal
      return accum
    }, 0)
    const displayOrderTotal = String(orderTotal)
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
                cart={cart}
                clearCart={this.props.clearCart}
                orderTotal={displayOrderTotal}
                addAddress={this.props.addAddress}
                getAddress={this.props.getAddress}
                changeAddress={this.props.changeAddress}
                addresses={this.props.addresses}
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
    addresses: state.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    addToCart: item => dispatch(addAnItem(item)),
    deleteItem: item => dispatch(deleteItem(item)),
    changeItem: item => dispatch(changeItem(item)),
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
