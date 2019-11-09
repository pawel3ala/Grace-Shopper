/* eslint-disable camelcase */
import React from 'react'
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
      amount: 5,
      updateShip: false,
      updateBill: false,
      shipName: '',
      shipLine1: '',
      shipLine2: '',
      shipCity: '',
      shipState: '',
      shipZip: '',
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
  }
  async handleSubmit(event) {
    event.preventDefault()
    try {
      let {token} = await this.props.stripe.createToken({
        name: this.state.billName
      })
      let amount = this.state.amount
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
      shipZip: shipAddress.zip,
      billName: billAddress.name,
      billLine1: billAddress.line1,
      billLine2: billAddress.line2,
      billCity: billAddress.city,
      billState: billAddress.state,
      billZip: billAddress.zip
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
                Edit Address
              </button>
            )}
          </div>
          <CardElement />
          <button type="submit">Confirm order</button>
        </form>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
