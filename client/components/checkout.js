import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {fetchAddress, changeAddress} from '../store/address'
import {connect} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'

class unconnectedCheckout extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleToken = this.handleToken.bind(this)
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
  handleToken(token, addresses) {
    console.log(token, addresses)
  }
  render() {
    let cart
    this.props.cart === undefined
      ? (cart = {id: 0, quantity: 0, name: '', image: '', price: ''})
      : (cart = this.props.cart)
    return (
      <div>
        <div id="checkoutHeader">
          <h1>Checkout</h1>
          {/* <h1>Checkout ({numberOfItems} items)</h1> */}
          <div className="cartContainer">
            {Object.keys(cart).map(item => {
              return (
                <div key={cart[item].productId} className="productCart">
                  <img src={cart[item].image} />
                  <div>Name: {cart[item].name}</div>
                  <div>Price: {cart[item].price}</div>
                  <div>
                    Quantity:{' '}
                    <form>
                      <input
                        name={cart[item].productId}
                        type="number"
                        value={cart[item].quantity}
                        onChange={this.handleChange}
                      />
                    </form>
                  </div>
                </div>
              )
            })}
          </div>
          <StripeCheckout
            stripeKey="pk_test_FjmwUNWUX5OIG2L1aadq9nkM00e6PJNafA"
            token={this.handleToken}
            billingAddress
            shippingAddress
            amount={5 * 100}
            name="Grapefruits Order"
          />
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
