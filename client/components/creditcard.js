import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from 'react-stripe-elements'

export class CreditCard extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="card">
          Card number:
          <input name="card" type="text" />
        </label>
        <label htmlFor="expiry">
          Expiration Date:
          <input name="expiry" type="text" />
        </label>
        <label htmlFor="security">
          CCV:
          <input name="security" type="text" />
        </label>
      </div>
    )
  }
}
