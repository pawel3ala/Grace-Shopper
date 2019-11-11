/* eslint-disable camelcase */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import Axios from 'axios'

const billAddress = {
  name: 'Test Name',
  line1: '123 Anywhere St.',
  line2: 'Apt 3',
  city: 'Townsville',
  state: 'Ohio',
  zip: '12345'
}

class UnreduxedBillAddressForm extends React.Component {
  constructor({handleSubmit}) {
    super({handleSubmit})
    this.state = {
      updateBill: false,
      billName: '',
      billLine1: '',
      billLine2: '',
      billCity: '',
      billState: '',
      billZip: ''
    }
    this.handleBillUpdate = this.handleBillUpdate.bind(this)
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
  render() {
    return (
      <div className="orderForm">
        <form onSubmit={this.props.handleSubmit}>
          {this.state.updateBill ? (
            <div>
              <label htmlFor="billName">Name:</label>
              <Field name="billName" component="input" type="text" />
              <br />
              <label htmlFor="billLine1">Street Address:</label>
              <Field name="billLine1" component="input" type="text" />
              <br />
              <label htmlFor="billLine2">Apt/Suite:</label>
              <Field name="billLine2" component="input" type="text" />
              <br />
              <label htmlFor="billCity">City:</label>
              <Field name="billCity" component="input" type="text" />
              <br />
              <label htmlFor="billState">State:</label>
              <Field name="billState" component="input" type="text" />
              <br />
              <label htmlFor="billZip">Postal Code:</label>
              <Field name="billZip" component="input" type="text" />
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
          {this.state.updateBill ? (
            <button type="submit">Confirm Changes</button>
          ) : (
            <button type="button" onClick={this.handleBillUpdate}>
              Edit Billing Address
            </button>
          )}
        </form>
      </div>
    )
  }
}

const BillAddressForm = reduxForm({
  // a unique name for the form
  form: 'BillAddress'
})(UnreduxedBillAddressForm)

export default BillAddressForm
