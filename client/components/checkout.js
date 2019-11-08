import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {Cart} from './index'
import {fetchAddress, changeAddress} from '../store/address'
import {connect} from 'react-redux'

class unconnectedCheckout extends React.Component {
  constructor() {
    super()
    this.state = {
      updateShip: false,
      updateBill: false,
      shipName: '',
      shipStreet: '',
      shipCity: '',
      shipState: '',
      shipZip: '',
      billName: '',
      billStreet: '',
      billCity: '',
      billState: '',
      billZip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleShipClick = this.handleShipClick.bind(this)
    this.handleBillClick = this.handleBillClick.bind(this)
    this.handleShipSubmit = this.handleShipSubmit.bind(this)
    this.handleBillSubmit = this.handleBillSubmit.bind(this)
    this.handleOrder = this.handleOrder.bind(this)
  }
  componentDidMount() {
    this.props.fetchItems()
    this.props.fetchAddress()
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleShipClick(event, name, street, city, state, zip) {
    event.preventDefault()
    this.setState({
      updateShip: !this.state.updateShip,
      shipName: name,
      shipStreet: street,
      shipCity: city,
      shipState: state,
      shipZip: zip
    })
  }
  handleBillClick(event, name, street, city, state, zip) {
    event.preventDefault()
    this.setState({
      updateBill: !this.state.updateBill,
      billName: name,
      billStreet: street,
      billCity: city,
      billState: state,
      billZip: zip
    })
  }
  handleShipSubmit() {
    this.props.changeAddress()
  }
  handleBillSubmit() {
    this.props.changeAddress()
  }
  handleOrder() {
    // this.props.createOrder()
    // this.props.fetchOrder()
    // this.props.setOrderItems()
    this.props.clearCart()
  }
  render() {
    const shipAddress = {
      name: 'Bob',
      street: '123 anywhere',
      city: 'tulsa',
      state: 'ohio',
      zip: '12345'
    }
    const billAddress = {
      name: 'Bob',
      street: '123 anywhere',
      city: 'tulsa',
      state: 'ohio',
      zip: '12345'
    }
    return (
      <div>
        <div id="checkoutHeader">
          <h1>Checkout</h1>
          {/* <h1>Checkout ({numberOfItems} items)</h1> */}
        </div>
        <div className="addressContainer">
          <div id="shippingContainer">
            <h3>Shipping Address:</h3>
            <form onSubmit={() => this.handleShipSubmit(event)}>
              {this.state.updateShip ? (
                <div>
                  <label htmlFor="shipName">Name:</label>
                  <input
                    name="shipName"
                    value={this.state.shipName}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipStreet">Street:</label>
                  <input
                    name="shipStreet"
                    value={this.state.shipStreet}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipCity">City:</label>
                  <input
                    name="shipCity"
                    value={this.state.shipCity}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipState">State:</label>
                  <input
                    name="shipState"
                    value={this.state.shipState}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipZip">Zip Code:</label>
                  <input
                    name="shipZip"
                    value={this.state.shipZip}
                    onChange={this.handleChange}
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="shipName">Name:</label>
                  <input name="shipName" value={shipAddress.name} readOnly />
                  <br />
                  <label htmlFor="shipStreet">Street:</label>
                  <input
                    name="shipStreet"
                    value={shipAddress.street}
                    readOnly
                  />
                  <br />
                  <label htmlFor="shipCity">City:</label>
                  <input name="shipCity" value={shipAddress.city} readOnly />
                  <br />
                  <label htmlFor="shipState">State:</label>
                  <input name="shipState" value={shipAddress.state} readOnly />
                  <br />
                  <label htmlFor="shipZip">Zip Code:</label>
                  <input name="shipZip" value={shipAddress.zip} readOnly />
                </div>
              )}
              <br />
              {this.state.updateShip ? (
                <button type="submit">Submit Changes</button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    this.handleShipClick(
                      event,
                      shipAddress.name,
                      shipAddress.street,
                      shipAddress.city,
                      shipAddress.state,
                      shipAddress.zip
                    )
                  }
                >
                  Update Shipping Address
                </button>
              )}
            </form>
            <div>
              <input
                type="checkbox"
                className="addressCheckbox"
                onChange={() => this.handleBillAddress(event)}
              />
              Billing and shipping address are the same.
            </div>
          </div>
          <div id="shippingContainer">
            <h3>Billing Address:</h3>
            <form onSubmit={() => this.handleBillSubmit(event)}>
              {this.state.updateBill ? (
                <div>
                  <label htmlFor="billName">Name:</label>
                  <input
                    name="billName"
                    value={this.state.billName}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billStreet">Street:</label>
                  <input
                    name="billStreet"
                    value={this.state.billStreet}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billCity">City:</label>
                  <input
                    name="billCity"
                    value={this.state.billCity}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billState">State:</label>
                  <input
                    name="billState"
                    value={this.state.billState}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billZip">Zip Code:</label>
                  <input
                    name="billZip"
                    value={this.state.billZip}
                    onChange={this.handleChange}
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="billName">Name:</label>
                  <input name="billName" value={billAddress.name} readOnly />
                  <br />
                  <label htmlFor="billStreet">Street:</label>
                  <input
                    name="billStreet"
                    value={billAddress.street}
                    readOnly
                  />
                  <br />
                  <label htmlFor="billCity">City:</label>
                  <input name="billCity" value={billAddress.city} readOnly />
                  <br />
                  <label htmlFor="billState">State:</label>
                  <input name="billState" value={billAddress.state} readOnly />
                  <br />
                  <label htmlFor="billZip">Zip Code:</label>
                  <input name="billZip" value={billAddress.zip} readOnly />
                </div>
              )}
              <br />
              {this.state.updateBill ? (
                <button type="submit">Submit Changes</button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    this.handleBillClick(
                      event,
                      billAddress.name,
                      billAddress.street,
                      billAddress.city,
                      billAddress.state,
                      billAddress.zip
                    )
                  }
                >
                  Update Billing Address
                </button>
              )}
            </form>
          </div>
        </div>
        <div>
          <Cart />
        </div>
        <div>
          <button type="button" onClick={this.handleOrder}>
            Place Order
          </button>
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
