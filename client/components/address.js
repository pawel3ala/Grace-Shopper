import React from 'react'

export class AddressForm extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="line1">
          Address:
          <input name="line1" type="text" />
        </label>
        <label htmlFor="line2">
          Apt/Suite:
          <input name="line2" type="text" />
        </label>
        <label htmlFor="city">
          City:
          <input name="city" type="text" />
        </label>
        <label htmlFor="state">
          State:
          <input name="state" type="text" />
        </label>
        <label htmlFor="zip">
          Postal Code:
          <input name="zip" type="text" />
        </label>
      </div>
    )
  }
}
