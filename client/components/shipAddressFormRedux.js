/* eslint-disable camelcase */
import React from 'react'
import {Field, reduxForm} from 'redux-form'

class UnreduxedShipAddressForm extends React.Component {
  constructor({handleSubmit}) {
    super({handleSubmit})
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    this.props.handleShipChange(event.target.name, event.target.value)
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
                <Field
                  name="shipName"
                  component="input"
                  type="text"
                  value={this.props.shipAddressState.shipName}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipStreet1">Street Address:</label>
                <Field
                  name="shipStreet1"
                  component="input"
                  type="text"
                  value={this.props.shipAddressState.shipStreet1}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipStreet2">Apt/Suite:</label>
                <Field
                  name="shipStreet2"
                  component="input"
                  type="text"
                  value={this.props.shipAddressState.shipStreet2}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipCity">City:</label>
                <Field
                  name="shipCity"
                  component="input"
                  type="text"
                  value={this.props.shipAddressState.shipCity}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipState">State:</label>
                <Field
                  name="shipState"
                  component="input"
                  type="text"
                  value={this.props.shipAddressState.shipState}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipZip">Postal Code:</label>
                <Field
                  name="shipZip"
                  component="input"
                  type="text"
                  value={this.props.shipAddressState.shipZip}
                  onChange={this.handleChange}
                />
                <br />
              </div>
              <br />
            </form>
          </div>
        ))
      : (shipForm = (
          <div className="orderForm">
            <form onSubmit={this.props.handleSubmit}>
              {this.props.updateShip ? (
                <div>
                  <label htmlFor="shipName">Name:</label>
                  <Field
                    name="shipName"
                    component="input"
                    type="text"
                    value={this.props.shipAddressState.shipName}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipStreet1">Street Address:</label>
                  <Field
                    name="shipStreet1"
                    component="input"
                    type="text"
                    value={this.props.shipAddressState.shipStreet1}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipStreet2">Apt/Suite:</label>
                  <Field
                    name="shipStreet2"
                    component="input"
                    type="text"
                    value={this.props.shipAddressState.shipStreet2}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipCity">City:</label>
                  <Field
                    name="shipCity"
                    component="input"
                    type="text"
                    value={this.props.shipAddressState.shipCity}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipState">State:</label>
                  <Field
                    name="shipState"
                    component="input"
                    type="text"
                    value={this.props.shipAddressState.shipState}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipZip">Postal Code:</label>
                  <Field
                    name="shipZip"
                    component="input"
                    type="text"
                    value={this.props.shipAddressState.shipZip}
                    onChange={this.handleChange}
                  />
                </div>
              ) : (
                <div>
                  <div>Name: {shipAddress.name}</div>
                  <br />
                  <div>Street Address: {shipAddress.street1}</div>
                  <br />
                  <div>Apt/Suite: {shipAddress.street2}</div>
                  <br />
                  <div>City: {shipAddress.city}</div>
                  <br />
                  <div>State: {shipAddress.state}</div>
                  <br />
                  <div>Postal Code: {shipAddress.zip}</div>
                  <br />
                </div>
              )}
              <br />
              <div>
                {this.props.updateShip ? (
                  <button type="submit">Save Changes</button>
                ) : (
                  <button type="button" onClick={this.props.handleShipUpdate}>
                    Change Shipping Address
                  </button>
                )}
              </div>
            </form>
          </div>
        ))
    return shipForm
  }
}

let ShipAddressForm = reduxForm({
  form: 'ShipAddress',
  destroyOnUnmount: false
})(UnreduxedShipAddressForm)

export default ShipAddressForm
