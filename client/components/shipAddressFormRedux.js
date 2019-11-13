/* eslint-disable camelcase */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Grid} from 'semantic-ui-react'

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
            <Form onSubmit={this.props.handleSubmit}>
              <Form.Group widths="equal" inline>
                <Grid>
                  <Grid.Row
                    columns={1}
                    width={1}
                    style={{paddingLeft: '10em', paddingRight: '16rem'}}
                  >
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
                  </Grid.Row>
                </Grid>
              </Form.Group>
            </Form>
          </div>
        ))
      : (shipForm = (
          <div className="orderForm">
            <Form>
              <Form.Group>
                <Grid>
                  <Grid.Row columns={1} style={{paddingLeft: '22rem'}}>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="Name:"
                        placeholder={shipAddress.name}
                        width={14}
                        readOnly
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="Street Address:"
                        placeholder={shipAddress.street1}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="Apt/Suite:"
                        placeholder={shipAddress.street2}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="City:"
                        placeholder={shipAddress.city}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="State:"
                        placeholder={shipAddress.state}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="Postal Code:"
                        placeholder={shipAddress.zip}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Group>
            </Form>
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
