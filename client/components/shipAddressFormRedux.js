/* eslint-disable camelcase */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {getAddress as getAddressData} from '../store/shipAddress'
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
      updateShip: false,
      shipName: '',
      shipStreet1: '',
      shipStreet2: '',
      shipCity: '',
      shipState: '',
      shipZip: ''
    }
    this.handleShipUpdate = this.handleShipUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleShipUpdate() {
    this.setState({
      updateShip: !this.state.updateShip,
      shipName: shipAddress.name,
      shipStreet1: shipAddress.line1,
      shipStreet2: shipAddress.line2,
      shipCity: shipAddress.city,
      shipState: shipAddress.state,
      shipZip: shipAddress.zip
    })
  }
  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
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
                <Field
                  name="shipName"
                  component="input"
                  type="text"
                  value={this.state.shipName}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipStreet1">Street Address:</label>
                <Field
                  name="shipStreet1"
                  component="input"
                  type="text"
                  value={this.state.shipStreet1}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipStreet2">Apt/Suite:</label>
                <Field
                  name="shipStreet2"
                  component="input"
                  type="text"
                  value={this.state.shipStreet2}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipCity">City:</label>
                <Field
                  name="shipCity"
                  component="input"
                  type="text"
                  value={this.state.shipCity}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipState">State:</label>
                <Field
                  name="shipState"
                  component="input"
                  type="text"
                  value={this.state.shipState}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="shipZip">Postal Code:</label>
                <Field
                  name="shipZip"
                  component="input"
                  type="text"
                  value={this.state.shipZip}
                  onChange={this.handleChange}
                />
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
                  <Field
                    name="shipName"
                    component="input"
                    type="text"
                    value={this.state.shipName}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipStreet1">Street Address:</label>
                  <Field
                    name="shipStreet1"
                    component="input"
                    type="text"
                    value={this.state.shipStreet1}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipStreet2">Apt/Suite:</label>
                  <Field
                    name="shipStreet2"
                    component="input"
                    type="text"
                    value={this.state.shipStreet2}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipCity">City:</label>
                  <Field
                    name="shipCity"
                    component="input"
                    type="text"
                    value={this.state.shipCity}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipState">State:</label>
                  <Field
                    name="shipState"
                    component="input"
                    type="text"
                    value={this.state.shipState}
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="shipZip">Postal Code:</label>
                  <Field
                    name="shipZip"
                    component="input"
                    type="text"
                    value={this.state.shipZip}
                    onChange={this.handleChange}
                  />
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

let ShipAddressForm = reduxForm({
  form: 'ShipAddress'
})(UnreduxedShipAddressForm)

export default ShipAddressForm
