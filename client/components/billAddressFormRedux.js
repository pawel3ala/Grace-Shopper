/* eslint-disable camelcase */
import React from 'react'
import {Field, reduxForm} from 'redux-form'

class UnreduxedBillAddressForm extends React.Component {
  constructor({handleSubmit}) {
    super({handleSubmit})
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    console.log('change')
    this.props.handleBillChange(event.target.name, event.target.value)
  }
  render() {
    let billAddress
    this.props.billAddress[0] === undefined
      ? (billAddress = {guest: true})
      : (billAddress = this.props.billAddress[0])
    let billForm = <div />
    billAddress.guest
      ? (billForm = (
          <div className="orderForm">
            <form onSubmit={this.props.handleSubmit}>
              <div>
                <label htmlFor="billName">Name:</label>
                <Field
                  name="billName"
                  component="input"
                  type="text"
                  value={this.props.billAddressState.billName}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="billStreet1">Street Address:</label>
                <Field
                  name="billStreet1"
                  component="input"
                  type="text"
                  value={this.props.billAddressState.billStreet1}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="billStreet2">Apt/Suite:</label>
                <Field
                  name="billStreet2"
                  component="input"
                  type="text"
                  value={this.props.billAddressState.billStreet2}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="billCity">City:</label>
                <Field
                  name="billCity"
                  component="input"
                  type="text"
                  value={this.props.billAddressState.billCity}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="billState">State:</label>
                <Field
                  name="billState"
                  component="input"
                  type="text"
                  value={this.props.billAddressState.billState}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="billZip">Postal Code:</label>
                <Field
                  name="billZip"
                  component="input"
                  type="text"
                  value={this.props.billAddressState.billZip}
                  onChange={this.handleChange}
                />
              </div>
              <br />
            </form>
          </div>
        ))
      : (billForm = (
          <div className="orderForm">
            <form onSubmit={this.props.handleSubmit}>
              {this.props.updateBill ? (
                <div>
                  <label htmlFor="billName">Name:</label>
                  <Field
                    name="billName"
                    component="input"
                    type="text"
                    value={this.props.billAddressState.billName}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billStreet1">Street Address:</label>
                  <Field
                    name="billStreet1"
                    component="input"
                    type="text"
                    value={this.props.billAddressState.billStreet1}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billStreet2">Apt/Suite:</label>
                  <Field
                    name="billStreet2"
                    component="input"
                    type="text"
                    value={this.props.billAddressState.billStreet2}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billCity">City:</label>
                  <Field
                    name="billCity"
                    component="input"
                    type="text"
                    value={this.props.billAddressState.billCity}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billState">State:</label>
                  <Field
                    name="billState"
                    component="input"
                    type="text"
                    value={this.props.billAddressState.billState}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="billZip">Postal Code:</label>
                  <Field
                    name="billZip"
                    component="input"
                    type="text"
                    value={this.props.billAddressState.billZip}
                    onChange={this.handleChange}
                  />
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
              {this.props.updateBill ? (
                <button type="submit">Confirm Changes</button>
              ) : (
                <button type="button" onClick={this.props.handleBillUpdate}>
                  Change Billing Address
                </button>
              )}
            </form>
          </div>
        ))
    return billForm
  }
}

const BillAddressForm = reduxForm({
  form: 'BillAddress',
  destroyOnUnmount: false
})(UnreduxedBillAddressForm)

export default BillAddressForm
