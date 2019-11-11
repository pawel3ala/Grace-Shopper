/* eslint-disable camelcase */
import React from 'react'
import {connect} from 'react-redux'
import {CheckoutCart} from './index'
import ShipAddressForm from './shipAddressFormRedux'
import BillAddressForm from './billAddressFormRedux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import Axios from 'axios'

// const billAddress = {
//   name: 'Test Name',
//   line1: '123 Anywhere St.',
//   line2: 'Apt 3',
//   city: 'Townsville',
//   state: 'Ohio',
//   zip: '12345'
// }
// const shipAddress = {
//   name: 'Test Name',
//   line1: '123 Anywhere St.',
//   line2: 'Apt 3',
//   city: 'Townsville',
//   state: 'Ohio',
//   zip: '12345'
// }

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      updateShip: false,
      enterBilling: false,
      updateBill: false,
      email: '',
      shipAddressState: {
        shipName: '',
        shipStreet1: '',
        shipStreet2: '',
        shipCity: '',
        shipState: '',
        shipZip: ''
      },
      billAddressState: {
        billName: '',
        billStreet1: '',
        billStreet2: '',
        billCity: '',
        billState: '',
        billZip: ''
      },
      orderFail: false
    }
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
    this.formShipSubmit = this.formShipSubmit.bind(this)
    this.formBillSubmit = this.formBillSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleShipChange = this.handleShipChange.bind(this)
    this.handleBillChange = this.handleBillChange.bind(this)
    this.handleShipUpdate = this.handleShipUpdate.bind(this)
    this.handleBillUpdate = this.handleBillUpdate.bind(this)
    this.handleBillingAddress = this.handleBillingAddress.bind(this)
  }
  async handleOrderSubmit(event) {
    event.preventDefault()
    try {
      let {token} = await this.props.stripe.createToken({
        name: this.state.billName
      })
      let amount = this.props.orderTotal / 100
      const {data} = await Axios.post('/api/payment', {token, amount})
      if (data.status) {
        this.setState({
          orderFail: false
        })
      } else {
        this.setState({
          orderFail: true
        })
      }
    } catch (err) {
      throw err
    }
  }
  handleEmailChange() {
    this.setState({
      email: [event.target.value]
    })
  }
  formShipSubmit(values) {
    if (!this.state.enterBilling) {
      const shipAddress = {
        name: values.shipName,
        street1: values.shipStreet1,
        street2: values.shipStreet2,
        city: values.shipCity,
        state: values.shipState,
        zip: values.shipZip,
        type: 'SHIP_TO'
      }
      const billAddress = {
        name: values.shipName,
        street1: values.shipStreet1,
        street2: values.shipStreet2,
        city: values.shipCity,
        state: values.shipState,
        zip: values.shipZip,
        type: 'BILL_TO'
      }
      this.props.changeAddress([shipAddress, billAddress])
    } else {
      const shipAddress = {
        name: values.shipName,
        street1: values.shipStreet1,
        street2: values.shipStreet2,
        city: values.shipCity,
        state: values.shipState,
        zip: values.shipZip,
        type: 'SHIP_TO'
      }
      this.props.changeAddress([shipAddress])
    }
  }
  formBillSubmit(values) {
    const billAddress = {
      name: values.billName,
      street1: values.billStreet1,
      street2: values.billStreet2,
      city: values.billCity,
      state: values.billState,
      zip: values.billZip,
      type: 'BILL_TO'
    }
    this.props.changeAddress([billAddress])
  }
  handleShipChange(name, value) {
    this.setState({
      shipAddressState: {...this.state.shipAddressState, [name]: value}
    })
  }
  handleBillChange(name, value) {
    this.setState({
      billAddressState: {...this.state.billAddressState, [name]: value}
    })
  }
  handleShipUpdate() {
    event.preventDefault()
    this.setState({
      updateShip: !this.state.updateShip
    })
  }
  handleBillUpdate() {
    event.preventDefault()
    this.setState({
      updateBill: !this.state.updateBill
    })
  }
  handleBillingAddress() {
    this.setState({
      enterBilling: !this.state.enterBilling
    })
  }
  render() {
    let addresses
    this.props.addresses === undefined
      ? (addresses = [0])
      : (addresses = this.props.addresses)
    const shipAddress = addresses.filter(address => address.type === 'SHIP_TO')
    const billAddress = addresses.filter(address => address.type === 'BILL_TO')
    return (
      <div className="orderForm">
        <ShipAddressForm
          onSubmit={values => this.formShipSubmit(values)}
          shipAddress={shipAddress}
          shipAddressState={this.state.shipAddressState}
          handleShipChange={this.handleShipChange}
          handleShipUpdate={this.handleShipUpdate}
          updateShip={this.state.updateShip}
        />
        <div>
          <input
            type="checkbox"
            onChange={this.handleBillingAddress}
            defaultChecked
          />Billing and Shipping are the same.
        </div>
        {!this.state.enterBilling ? null : (
          <BillAddressForm
            onSubmit={this.formBillSubmit}
            billAddress={billAddress}
            billAddressState={this.state.billAddressState}
            handleBillChange={this.handleBillChange}
            handleBillUpdate={this.handleBillUpdate}
            updateBill={this.state.updateBill}
          />
        )}
        <br />
        <form onSubmit={this.handleOrderSubmit}>
          <label htmlFor="email">E-mail:</label>
          <input
            name="email"
            required
            type="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <br />
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
          {this.state.orderFail ? (
            <div>
              <h3>
                Your card failed to process correctly.<br />Please try a new
                card or check that the details are correct.
              </h3>
            </div>
          ) : null}
        </form>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
