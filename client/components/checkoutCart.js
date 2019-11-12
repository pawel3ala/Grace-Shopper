import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {connect} from 'react-redux'

class UnconnectedCheckoutCart extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchItems()
  }
  async handleChange(event) {
    const productId = event.target.name
    const quantity = Number(event.target.value)
    const itemObj = {
      productId,
      quantity
    }
    await this.props.changeItem(itemObj)
    this.props.fetchItems()
  }
  render() {
    let cartAll
    this.props.cart === undefined
      ? (cartAll = [0])
      : (cartAll = this.props.cart)
    let cart = cartAll.filter(cartItem => {
      return cartItem.orderId === null
    })
    return (
      <div className="cartContainer">
        <h3>Review Items</h3>
        {cart.length > 0
          ? cart.map(item => {
              const price = String(item.price)
              const itemSubtotal = item.price * item.quantity
              const displayItemSubtotal = String(itemSubtotal)
              return (
                <div key={item.productId} className="productCart">
                  <img src={item.image} />
                  <div>Name: {item.name}</div>
                  <div>
                    Unit Price: ${price.slice(0, price.length - 2)}.{price.slice(
                      price.length - 2
                    )}
                  </div>
                  <div>
                    Quantity:{' '}
                    <input
                      name={item.productId}
                      type="number"
                      min="1"
                      max={item.productQuantity}
                      value={item.quantity}
                      onChange={this.handleChange}
                    />
                    <div>
                      Item Subtotal: ${displayItemSubtotal.slice(
                        0,
                        displayItemSubtotal.length - 2
                      )}.{displayItemSubtotal.slice(
                        displayItemSubtotal.length - 2
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          : 'Cart is Empty'}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    address: state.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    addToCart: item => dispatch(addAnItem(item)),
    deleteItem: item => dispatch(deleteItem(item)),
    changeItem: item => dispatch(changeItem(item)),
    clearCart: () => dispatch(clearAllItems())
  }
}

export const CheckoutCart = connect(mapStateToProps, mapDispatchToProps)(
  UnconnectedCheckoutCart
)
