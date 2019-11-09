/* eslint-disable camelcase */
import React from 'react'
import {CheckoutCart} from './index'
import {CardElement, injectStripe} from 'react-stripe-elements'
import Axios from 'axios'

const shipAddress = {
  name: 'Test Name',
  line1: '123 Anywhere St.',
  line2: 'Apt 3',
  city: 'Townsville',
  state: 'Ohio',
  zip: '12345'
}
const billAddress = {
  name: 'Test Name',
  line1: '123 Anywhere St.',
  line2: 'Apt 3',
  city: 'Townsville',
  state: 'Ohio',
  zip: '12345'
}

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      updateShip: false,
      updateBill: false,
      shipName: '',
      shipLine1: '',
      shipLine2: '',
      shipCity: '',
      shipState: '',
      shipZip: '',
      enterBilling: false,
      billName: '',
      billLine1: '',
      billLine2: '',
      billCity: '',
      billState: '',
      billZip: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleShipUpdate = this.handleShipUpdate.bind(this)
    this.handleShipSave = this.handleShipSave.bind(this)
    this.handleBillUpdate = this.handleBillUpdate.bind(this)
    this.handleBillSave = this.handleBillSave.bind(this)
    this.handleBillingAddress = this.handleBillingAddress.bind(this)
  }
  async handleSubmit(event) {
    event.preventDefault()
    try {
      let {token} = await this.props.stripe.createToken({
        name: this.state.billName
      })
      let amount = this.props.orderTotal
      const {data} = await Axios.post('/api/payment', {token, amount})
      if (data.status) {
        console.log('Success!')
      }
    } catch (err) {
      throw err
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleShipUpdate() {
    this.setState({
      updateShip: !this.state.updateShip,
      shipName: shipAddress.name,
      shipLine1: shipAddress.line1,
      shipLine2: shipAddress.line2,
      shipCity: shipAddress.city,
      shipState: shipAddress.state,
      shipZip: shipAddress.zip
    })
  }
  handleBillUpdate() {
    this.setState({
      updateBill: !this.state.updateBill,
      billName: billAddress.name,
      billLine1: billAddress.line1,
      billLine2: billAddress.line2,
      billCity: billAddress.city,
      billState: billAddress.state,
      billZip: billAddress.zip
    })
  }
  handleBillingAddress() {
    this.setState({
      enterBilling: !this.state.enterBilling
    })
  }
  handleShipSave() {
    // this.props.changeAddress()
    // this.props.fetchAddress()
    this.setState({
      updateShip: !this.state.updateShip
    })
    console.log('saved')
  }
  handleBillSave() {
    // this.props.changeAddress()
    // this.props.fetchAddress()
    this.setState({
      updateBill: !this.state.updateBill
    })
    console.log('saved')
  }
  render() {
    return (
      <div className="orderForm">
        <form onSubmit={this.handleSubmit}>
          {this.state.updateShip ? (
            <div>
              <label htmlFor="shipName">
                Name:
                <input
                  name="shipName"
                  value={this.state.shipName}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="shipLine1">
                Street Address:
                <input
                  name="shipLine1"
                  value={this.state.shipLine1}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="shipLine2">
                Apt/Suite:
                <input
                  name="shipLine2"
                  value={this.state.shipLine2}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="shipCity">
                City:
                <input
                  name="shipCity"
                  value={this.state.shipCity}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="shipState">
                State:
                <input
                  name="shipState"
                  value={this.state.shipState}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="shipZip">
                Postal Code:
                <input
                  name="shipZip"
                  value={this.state.shipZip}
                  onChange={this.handleChange}
                />
              </label>
            </div>
          ) : (
            <div>
              <div>Name: {shipAddress.name}</div>
              <br />
              <div>Street Address: {shipAddress.line1}</div>
              <br />
              <div>Apt/Suite: {shipAddress.line2}</div>
              <br />
              <div>City: {shipAddress.city}</div>
              <br />
              <div>State: {shipAddress.state}</div>
              <br />
              <div>Postal Code: {shipAddress.zip}</div>
            </div>
          )}
          <br />
          <div>
            {this.state.updateShip ? (
              <button type="button" onClick={this.handleShipSave}>
                Save Changes
              </button>
            ) : (
              <button type="button" onClick={this.handleShipUpdate}>
                Edit Shipping Address
              </button>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              onChange={this.handleBillingAddress}
              defaultChecked
            />Billing and Shipping are the same.
          </div>
          <br />
          {!this.state.enterBilling ? null : this.state.updateBill ? (
            <div>
              <label htmlFor="billName">
                Name:
                <input
                  name="billName"
                  value={this.state.billName}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="billLine1">
                Street Address:
                <input
                  name="billLine1"
                  value={this.state.billLine1}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="billLine2">
                Apt/Suite:
                <input
                  name="billLine2"
                  value={this.state.billLine2}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="billCity">
                City:
                <input
                  name="billCity"
                  value={this.state.billCity}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="billState">
                State:
                <input
                  name="billState"
                  value={this.state.billState}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label htmlFor="billZip">
                Postal Code:
                <input
                  name="billZip"
                  value={this.state.billZip}
                  onChange={this.handleChange}
                />
              </label>
            </div>
          ) : (
            <div>
              <div>Name: {billAddress.name}</div>
              <br />
              <div>Street Address: {billAddress.line1}</div>
              <br />
              <div>Apt/Suite: {billAddress.line2}</div>
              <br />
              <div>City: {billAddress.city}</div>
              <br />
              <div>State: {billAddress.state}</div>
              <br />
              <div>Postal Code: {billAddress.zip}</div>
            </div>
          )}
          <br />
          {!this.state.enterBilling ? null : this.state.updateBill ? (
            <button type="button" onClick={this.handleBillSave}>
              Save Changes
            </button>
          ) : (
            <button type="button" onClick={this.handleBillUpdate}>
              Edit Billing Address
            </button>
          )}
          <CardElement />
          <br />
          <CheckoutCart />
          <button type="submit">Confirm Order</button>
          <div>
            Order Total: ${this.props.orderTotal.slice(
              0,
              this.props.orderTotal.length - 2
            )}.{this.props.orderTotal.slice(this.props.orderTotal.length - 2)}
          </div>
        </form>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
