import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {fetchAddress, changeAddress} from '../store/address'
import {CheckoutForm} from './checkoutForm'
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
    const quantity = event.target.value
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
    this.props.cart === undefined ? (cart = []) : (cart = this.props.cart)
    return (
      <div>
        <div id="checkoutHeader">
          <h1>Checkout</h1>
          {/* <h1>Checkout ({numberOfItems} items)</h1> */}
          <div className="cartContainer">
            {cart.length > 0
              ? cart.map(item => {
                  return (
                    <div key={item.productId} className="productCart">
                      <img src={item.image} />
                      <div>Name: {item.name}</div>
                      <div>Price: {item.price}</div>
                      <div>
                        Quantity:{' '}
                        <form>
                          <input
                            name={item.productId}
                            type="number"
                            min="1"
                            max={item.productQuantity}
                            value={item.quantity}
                            onChange={this.handleChange}
                          />
                        </form>
                      </div>
                    </div>
                  )
                })
              : 'Cart is Empty'}
          </div>
        </div>
        <br />
        <div>
          <StripeProvider apiKey="pk_test_FjmwUNWUX5OIG2L1aadq9nkM00e6PJNafA">
            <Elements>
              <CheckoutForm />
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
