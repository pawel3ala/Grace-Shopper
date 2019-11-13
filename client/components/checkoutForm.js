/* eslint-disable complexity */
/* eslint-disable max-statements-per-line */
/* eslint-disable max-statements */
/* eslint-disable camelcase */
import React from 'react'
import {CheckoutCart, UserHome} from './index'
import UserEmailInput from './userEmailInput'
import ShipAddressForm from './shipAddressFormRedux'
import BillAddressForm from './billAddressFormRedux'
import {withRouter} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements'
// import sendMail from '../../script/email_sender'
// const throttle = require('lodash.throttle')
import Axios from 'axios'

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      updateShip: false,
      enterBilling: false,
      updateBill: false,
      emailUpdate: false,
      email: '',
      shipAddressState: {
        shipName: '',
        shipStreet1: '',
        shipStreet2: '',
        shipCity: '',
        shipState: '',
        shipZip: ''
      },
      billAddressState: {
        billName: '',
        billStreet1: '',
        billStreet2: '',
        billCity: '',
        billState: '',
        billZip: ''
      },
      orderFail: false,
      confirmButton: false
    }
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this)
    this.throttle = this.throttle.bind(this)
    this.formShipSubmit = this.formShipSubmit.bind(this)
    this.formBillSubmit = this.formBillSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleShipChange = this.handleShipChange.bind(this)
    this.handleBillChange = this.handleBillChange.bind(this)
    this.handleShipUpdate = this.handleShipUpdate.bind(this)
    this.handleBillUpdate = this.handleBillUpdate.bind(this)
    this.handleBillingAddress = this.handleBillingAddress.bind(this)
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this)
  }
  throttle(limit) {
    this.setState({
      confirmButton: true
    })
    setTimeout(() => limit)
  }
  async handleOrderSubmit(event, user) {
    event.preventDefault()
    this.throttle(5000)
    // Checks if user/guest has an address to start with
    if (this.props.addresses.length === 0) {
      let tokenObj = {}
      // Check if shipping/billing are the same
      if (!this.state.enterBilling) {
        // If the same, use shipping name for token
        tokenObj = {
          name: this.state.shipAddressState.shipName
        }
      } else {
        // If not the same, use billing name for token
        tokenObj = {
          name: this.state.billAddressState.billName
        }
      }
      try {
        let {token} = await this.props.stripe.createToken(tokenObj)
        let amount = this.props.orderTotal / 100
        // Send payment to Strip
        const {data} = await Axios.post('/api/payment', {token, amount})
        if (data.status) {
          // If prior payment attempt failed, reset orderFail bool to false
          this.setState({
            orderFail: false
          })
          // Now that order is successful, we create addresses for either guest or new user
          // Check if shipping/billing are the same
          if (!this.state.enterBilling) {
            // If the same, use shipping info for both addressses
            const orderObj = {
              email: this.state.email,
              shipAddress: {
                name: this.state.shipAddressState.shipName,
                street1: this.state.shipAddressState.shipStreet1,
                street2: this.state.shipAddressState.shipStreet2,
                city: this.state.shipAddressState.shipCity,
                state: this.state.shipAddressState.shipState,
                zip: this.state.shipAddressState.shipZip,
                type: 'SHIP_TO'
              },
              billAddress: {
                name: this.state.shipAddressState.shipName,
                street1: this.state.shipAddressState.shipStreet1,
                street2: this.state.shipAddressState.shipStreet2,
                city: this.state.shipAddressState.shipCity,
                state: this.state.shipAddressState.shipState,
                zip: this.state.shipAddressState.shipZip,
                type: 'BILL_TO'
              },
              totalPrice: this.props.orderTotal,
              cart: this.props.cart
            }
            const newOrder = await Axios.post('/api/order', orderObj)
            const orderId = newOrder.data.id
            const userId = newOrder.data.userId
            this.props.cart.map(product => {
              const orderItemObj = {
                userId,
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
                orderId
              }
              this.props.createOrderItem(orderItemObj)
            })
            const orderNo = Math.floor(Math.random() * 9000000000000)
            const orderDetails = this.props.cart.map(item => {
              return (
                <div key={item.id}>
                  <img src={item.image} />
                  <br />
                  <div>Item: {item.name}</div>
                  <br />
                  <div>Amount: {item.quantity}</div>
                  <br />
                  <div>Subtotal: {item.quantity * item.price}</div>
                  <br />
                </div>
              )
            })
            const shippingAddress = (
              <div>
                <div>Name: {this.state.shipAddressState.shipName}</div>
                <br />
                <div>Street: {this.state.shipAddressState.shipStreet1}</div>
                <br />
                <div>Apt/Suite: {this.state.shipAddressState.shipStreet2}</div>
                <br />
                <div>City: {this.state.shipAddressState.shipCity}</div>
                <br />
                <div>State: {this.state.shipAddressState.shipState}</div>
                <br />
                <div>Zip Code: {this.state.shipAddressState.shipZip}</div>
                <br />
              </div>
            )
            const emailHTML = (
              <div>
                <h1>Thank you for your order!!</h1>
                <h1>Your grapefruits are on the way!!</h1>
                <h3>Order No. {orderNo} Details:</h3>
                <div>
                  <h3>Shipping Address:</h3>
                </div>
                {shippingAddress}
                <div>
                  <h3>Order details:</h3>
                </div>
                <div>{orderDetails}</div>
                <div>
                  <h3>Order Total: {this.props.orderTotal}</h3>
                </div>
              </div>
            )
            // sendMail({
            //   to: this.state.email,
            //   subject: `Order No. ${orderNo} from Grapefruits.com`,
            //   text:
            //     'Your order is in our system being processed! Here are the details!',
            //   html: emailHTML
            // }).catch(console.error)
            if (!this.props.user.hasOwnProperty('email')) {
              console.log('Thank you for your order!')
            } else {
              this.props.history.push(`/order/${orderId}`)
            }
          } else {
            // If the same, use respective addressses
            let thisEmail = ''
            if (this.state.email === '') {
              thisEmail = user.email
            } else {
              thisEmail = this.state.email
            }
            const orderObj = {
              email: thisEmail,
              shipAddress: {
                name: this.state.shipAddressState.shipName,
                street1: this.state.shipAddressState.shipStreet1,
                street2: this.state.shipAddressState.shipStreet2,
                city: this.state.shipAddressState.shipCity,
                state: this.state.shipAddressState.shipState,
                zip: this.state.shipAddressState.shipZip,
                type: 'SHIP_TO'
              },
              billAddress: {
                name: this.state.billAddressState.billName,
                street1: this.state.billAddressState.billStreet1,
                street2: this.state.billAddressState.billStreet2,
                city: this.state.billAddressState.billCity,
                state: this.state.billAddressState.billState,
                zip: this.state.billAddressState.billZip,
                type: 'BILL_TO'
              },
              totalPrice: this.props.orderTotal,
              cart: this.props.cart
            }
            const newOrder = await Axios.post('/api/order', orderObj)
            const orderId = newOrder.data.id
            const userId = newOrder.data.userId
            this.props.cart.map(product => {
              const orderItemObj = {
                userId,
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
                orderId
              }
              this.props.createOrderItem(orderItemObj)
            })
            if (!this.props.user.hasOwnProperty('email')) {
              console.log('Thank you for your order!')
            } else {
              this.props.history.push(`/order/${orderId}`)
            }
          }
        } else {
          // If payment fails, set orderFail bool to true to display message
          this.setState({
            orderFail: true,
            confirmButton: false
          })
        }
      } catch (err) {
        throw err
      }
    } else {
      // Dealing with an authenticated user, they have a billing address. Get it.
      const billAddress = this.props.addresses.filter(
        address => address.type === 'BILL_TO'
      )
      const shipAddress = this.props.addresses.filter(
        address => address.type === 'SHIP_TO'
      )
      // Use billAddress for token name
      const tokenObj = {
        name: billAddress[0].name
      }
      try {
        let {token} = await this.props.stripe.createToken(tokenObj)
        let amount = this.props.orderTotal / 100
        const {data} = await Axios.post('/api/payment', {token, amount})
        if (data.status) {
          this.setState({
            orderFail: false
          })
          let thisEmail = ''
          if (this.state.email === '') {
            thisEmail = user.email
          } else {
            thisEmail = this.state.email
          }
          const orderObj = {
            email: thisEmail,
            shipAddress: {
              id: shipAddress.id
            },
            billAddress: {
              id: billAddress.id
            },
            totalPrice: this.props.orderTotal,
            cart: this.props.cart
          }
          const newOrder = await Axios.post('/api/order', orderObj)
          const orderId = newOrder.data.id
          this.props.cart.map(product => {
            const orderItemObj = {
              productId: product.productId,
              quantity: product.quantity,
              price: product.price,
              orderId
            }
            this.props.createOrderItem(orderItemObj)
          })
          this.props.history.push(`/order/${orderId}`)
        } else {
          this.setState({
            orderFail: true,
            confirmButton: false
          })
        }
      } catch (err) {
        throw err
      }
    }
  }
  handleEmailChange() {
    this.setState({
      email: [event.target.value]
    })
  }
  formShipSubmit(values) {
    if (!this.state.enterBilling) {
      const shipAddress = {
        name: values.shipName,
        street1: values.shipStreet1,
        street2: values.shipStreet2,
        city: values.shipCity,
        state: values.shipState,
        zip: values.shipZip,
        type: 'SHIP_TO'
      }
      const billAddress = {
        name: values.shipName,
        street1: values.shipStreet1,
        street2: values.shipStreet2,
        city: values.shipCity,
        state: values.shipState,
        zip: values.shipZip,
        type: 'BILL_TO'
      }
      this.props.changeAddress([shipAddress, billAddress])
    } else {
      const shipAddress = {
        name: values.shipName,
        street1: values.shipStreet1,
        street2: values.shipStreet2,
        city: values.shipCity,
        state: values.shipState,
        zip: values.shipZip,
        type: 'SHIP_TO'
      }
      this.props.changeAddress([shipAddress])
    }
  }
  formBillSubmit(values) {
    const billAddress = {
      name: values.billName,
      street1: values.billStreet1,
      street2: values.billStreet2,
      city: values.billCity,
      state: values.billState,
      zip: values.billZip,
      type: 'BILL_TO'
    }
    this.props.changeAddress([billAddress])
  }
  handleShipChange(name, value) {
    this.setState({
      shipAddressState: {...this.state.shipAddressState, [name]: value}
    })
  }
  handleBillChange(name, value) {
    this.setState({
      billAddressState: {...this.state.billAddressState, [name]: value}
    })
  }
  handleShipUpdate() {
    event.preventDefault()
    this.setState({
      updateShip: !this.state.updateShip
    })
  }
  handleBillUpdate() {
    event.preventDefault()
    this.setState({
      updateBill: !this.state.updateBill
    })
  }
  handleBillingAddress() {
    this.setState({
      enterBilling: !this.state.enterBilling
    })
  }
  handleUpdateEmail() {
    this.setState({
      emailUpdate: !this.state.emailUpdate
    })
  }
  render() {
    let user
    !this.props.user.hasOwnProperty('email')
      ? (user = false)
      : (user = this.props.user)
    let addresses
    this.props.addresses === undefined ||
    typeof this.props.addresses === 'string'
      ? (addresses = [0])
      : (addresses = this.props.addresses)
    const shipAddress = addresses.filter(address => address.type === 'SHIP_TO')
    const billAddress = addresses.filter(address => address.type === 'BILL_TO')
    let shipAddressBool
    shipAddress[0] === undefined
      ? (shipAddressBool = {guest: true})
      : (shipAddressBool = {guest: false})
    return (
      <div className="orderForm">
        <div>Shipping Address:</div>
        <ShipAddressForm
          onSubmit={values => this.formShipSubmit(values)}
          shipAddress={shipAddress}
          shipAddressState={this.state.shipAddressState}
          handleShipChange={this.handleShipChange}
          handleShipUpdate={this.handleShipUpdate}
          updateShip={this.state.updateShip}
        />
        {shipAddressBool.guest ? (
          <div>
            <div>
              <input
                type="checkbox"
                onChange={this.handleBillingAddress}
                defaultChecked
              />Billing and Shipping are the same.
            </div>
            {!this.state.enterBilling ? null : (
              <div>
                <div>Billing Address:</div>
                <BillAddressForm
                  onSubmit={this.formBillSubmit}
                  billAddress={billAddress}
                  billAddressState={this.state.billAddressState}
                  handleBillChange={this.handleBillChange}
                  handleBillUpdate={this.handleBillUpdate}
                  updateBill={this.state.updateBill}
                />
              </div>
            )}{' '}
          </div>
        ) : (
          <div>
            <div>Billing Address:</div>
            <BillAddressForm
              onSubmit={this.formBillSubmit}
              billAddress={billAddress}
              billAddressState={this.state.billAddressState}
              handleBillChange={this.handleBillChange}
              handleBillUpdate={this.handleBillUpdate}
              updateBill={this.state.updateBill}
            />
          </div>
        )}
        <br />
        <form onSubmit={() => this.handleOrderSubmit(event, user)}>
          {user ? (
            <div>E-mail: {this.props.user.email}</div>
          ) : (
            <div>
              <label htmlFor="email">E-mail:</label>
              <input
                name="email"
                required
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
          )}
          <br />
          <CardElement />
          <br />
          <CheckoutCart />
          <button type="submit" disabled={this.state.confirmButton}>
            Confirm Order
          </button>
          {this.props.orderTotal === '0' ? (
            <div>Order Total: $0</div>
          ) : (
            <div>
              Order Total: ${this.props.orderTotal.slice(
                0,
                this.props.orderTotal.length - 2
              )}.{this.props.orderTotal.slice(this.props.orderTotal.length - 2)}
            </div>
          )}
          {this.state.orderFail ? (
            <div>
              <h3>
                Your card failed to process correctly.<br />Please try a new
                card or check that the details are correct.
              </h3>
            </div>
          ) : null}
        </form>
      </div>
    )
  }
}

export default injectStripe(withRouter(CheckoutForm))
