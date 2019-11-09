import React from 'react'
import {
  CardElement,
  injectStripe,
  ReactStripeElements
} from 'react-stripe-elements'

import {AddressForm} from './address'
import {CreditCard} from './creditcard'

export class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log(this.props.stripe)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CardElement />
          <button type="submit">Confirm order</button>
        </form>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
