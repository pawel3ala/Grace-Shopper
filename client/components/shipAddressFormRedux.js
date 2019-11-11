/* eslint-disable camelcase */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import Axios from 'axios'

// const shipAddress = {
//   line2: 'Apt 3',
//   city: 'Townsville',
//   state: 'Ohio',
//   zip: '12345'
// }
// const billAddress = {
//   name: 'Test Name',
//   line1: '123 Anywhere St.',
//   line2: 'Apt 3',
//   city: 'Townsville',
//   state: 'Ohio',
//   zip: '12345'
// }

class UnreduxedShipAddressForm extends React.Component {
  constructor({handleSubmit}) {
    super({handleSubmit})
    this.state = {
      updateShip: false
      // shipName: '',
      // shipLine1: '',
      // shipLine2: '',
      // shipCity: '',
      // shipState: '',
      // shipZip: ''
    }
    this.handleShipUpdate = this.handleShipUpdate.bind(this)
  }
  handleShipUpdate() {
    this.setState({
      updateShip: !this.state.updateShip
      // shipName: shipAddress.name,
      // shipLine1: shipAddress.line1,
      // shipLine2: shipAddress.line2,
      // shipCity: shipAddress.city,
      // shipState: shipAddress.state,
      // shipZip: shipAddress.zip
    })
  }
  render() {
    let shipAddress
    this.props.shipAddress[0] === undefined
      ? (shipAddress = {guest: true})
      : (shipAddress = this.props.shipAddress[0])
    let shipForm = <div />
    shipAddress.guest
      ? (shipForm = (
          <div className="orderForm">
            <form onSubmit={this.props.handleSubmit}>
              <div>
                <label htmlFor="shipName">Name:</label>
                <Field name="shipName" component="input" type="text" />
                <br />
                <label htmlFor="shipLine1">Street Address:</label>
                <Field name="shipLine1" component="input" type="text" />
                <br />
                <label htmlFor="shipLine2">Apt/Suite:</label>
                <Field name="shipLine2" component="input" type="text" />
                <br />
                <label htmlFor="shipCity">City:</label>
                <Field name="shipCity" component="input" type="text" />
                <br />
                <label htmlFor="shipState">State:</label>
                <Field name="shipState" component="input" type="text" />
                <br />
                <label htmlFor="shipZip">Postal Code:</label>
                <Field name="shipZip" component="input" type="text" />
              </div>
              <br />
              <div>
                <button type="submit">Confirm Address</button>
              </div>
            </form>
          </div>
        ))
      : (shipForm = (
          <div className="orderForm">
            <form onSubmit={this.props.handleSubmit}>
              {this.props.updateShip ? (
                <div>
                  <label htmlFor="shipName">Name:</label>
                  <Field name="shipName" component="input" type="text" />
                  <br />
                  <label htmlFor="shipLine1">Street Address:</label>
                  <Field name="shipLine1" component="input" type="text" />
                  <br />
                  <label htmlFor="shipLine2">Apt/Suite:</label>
                  <Field name="shipLine2" component="input" type="text" />
                  <br />
                  <label htmlFor="shipCity">City:</label>
                  <Field name="shipCity" component="input" type="text" />
                  <br />
                  <label htmlFor="shipState">State:</label>
                  <Field name="shipState" component="input" type="text" />
                  <br />
                  <label htmlFor="shipZip">Postal Code:</label>
                  <Field name="shipZip" component="input" type="text" />
                </div>
              ) : (
                <div>
                  <div>Name: {this.props.shipAddress.shipName}</div>
                  <br />
                  <div>Street Address: {this.props.shipAddress.shipLine1}</div>
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
                {this.props.updateShip ? (
                  <button type="submit">Save Changes</button>
                ) : (
                  <button type="button" onClick={this.props.handleShipUpdate}>
                    Edit Shipping Address
                  </button>
                )}
              </div>
            </form>
          </div>
        ))
    return shipForm
  }
}

const ShipAddressForm = reduxForm({
  form: 'ShipAddress'
})(UnreduxedShipAddressForm)

export default ShipAddressForm
