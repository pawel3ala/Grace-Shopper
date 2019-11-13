/* eslint-disable camelcase */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Grid} from 'semantic-ui-react'

class UnreduxedBillAddressForm extends React.Component {
  constructor({handleSubmit}) {
    super({handleSubmit})
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
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
            <Form onSubmit={this.props.handleSubmit}>
              <Form.Group widths="equal" inline>
                <Grid>
                  <Grid.Row
                    columns={1}
                    width={1}
                    style={{paddingLeft: '10em', paddingRight: '16rem'}}
                  >
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
                    <br />
                  </Grid.Row>
                </Grid>
              </Form.Group>
            </Form>
          </div>
        ))
      : (billForm = (
          <div className="orderForm">
            <Form>
              <Form.Group>
                <Grid>
                  <Grid.Row columns={1} style={{paddingLeft: '22rem'}}>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="Name:"
                        placeholder={billAddress.name}
                        width={14}
                        readOnly
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="Street Address:"
                        placeholder={billAddress.street1}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="Apt/Suite:"
                        placeholder={billAddress.street2}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="City:"
                        placeholder={billAddress.city}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="State:"
                        placeholder={billAddress.state}
                        readOnly
                        width={14}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                        fluid
                        label="Postal Code:"
                        placeholder={billAddress.zip}
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
    return billForm
  }
}

const BillAddressForm = reduxForm({
  form: 'BillAddress',
  destroyOnUnmount: false
})(UnreduxedBillAddressForm)

export default BillAddressForm
