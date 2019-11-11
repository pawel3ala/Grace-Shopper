/* eslint-disable camelcase */
import React from 'react'
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
      updateBill: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formShipSubmit = this.formShipSubmit.bind(this)
    this.formBillSubmit = this.formBillSubmit.bind(this)
    this.handleShipUpdate = this.handleShipUpdate.bind(this)
    this.handleBillUpdate = this.handleBillUpdate.bind(this)
    this.handleBillingAddress = this.handleBillingAddress.bind(this)
  }
  async handleSubmit(event) {
    event.preventDefault()
    let saleOK = true
    this.props.cart.forEach(product => {
      product.productQuantity < product.quantity
        ? (saleOK = false)
        : (saleOK = true)
    })

    if (saleOK) {
      try {
        let {token} = await this.props.stripe.createToken({
          name: this.state.billName
        })
        let amount = this.props.orderTotal / 100
        const {data} = await Axios.post('/api/payment', {token, amount})
        if (data.status) {
          console.log('Success!')
        } else {
          console.log('fail')
        }
      } catch (err) {
        throw err
      }
    } else {
      console.log('One or more items in your cart have become unavailable.')
    }
  }
  formShipSubmit(values) {
    if (!this.state.enterBilling) {
      console.log(values)
      const shipAddress = {
        name: values.shipName,
        street1: values.shipStreet1,
        street2: values.shipStreet2,
        city: values.shipCity,
        state: values.shipState,
        zip: values.shipZip,
        type: 'SHIP_TO',
        guest: true
      }
      const billAddress = {
        name: values.shipName,
        street1: values.shipStreet1,
        street2: values.shipStreet2,
        city: values.shipCity,
        state: values.shipState,
        zip: values.shipZip,
        type: 'BILL_TO',
        guest: true
      }
      this.props.getAddress([shipAddress, billAddress])
      // this.props.getAddress(values)
    }
    // if (this.props.addresses[0].guest) {
    //   console.log('hey')
    // }
    // this.setState({
    //   updateShip: !this.state.updateShip
    // })
  }
  formBillSubmit(values) {
    console.log(values)
    // this.setState({
    //   updateBill: !this.state.updateBill
    // })
  }
  handleShipUpdate() {
    event.preventDefault()
    this.setState({
      updateShip: !this.state.updateShip
      //   shipAddress: {
      //     shipName: shipAddress.name,
      //     shipLine1: shipAddress.line1,
      //     shipLine2: shipAddress.line2,
      //     shipCity: shipAddress.city,
      //     shipState: shipAddress.state,
      //     shipZip: shipAddress.zip
      //   }
    })
  }
  handleBillUpdate() {
    event.preventDefault()
    this.setState({
      updateBill: !this.state.updateBill,
      billAddress: {
        billName: billAddress.name,
        billLine1: billAddress.line1,
        billLine2: billAddress.line2,
        billCity: billAddress.city,
        billState: billAddress.state,
        billZip: billAddress.zip
      }
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
            updateBill={this.state.updateBill}
          />
        )}
        <form onSubmit={this.handleSubmit}>
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
