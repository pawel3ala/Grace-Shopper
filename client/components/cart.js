import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {connect} from 'react-redux'

class unconnectedCart extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
  }
  render() {
    const cart = this.props.cart.cartItems
      ? this.props.cart
      : {cartItems: [], products: []}
    return (
      <div className="cartContainer">
        {cart.cartItems.map(item => {
          const selectedProduct = this.props.cart.products.find(
            product => product.id === item.productId
          )
          return (
            <div key={item.productId} className="productCart">
              <img src={selectedProduct.image} />
              <div>Name: {selectedProduct.name}</div>
              <div>Price: {selectedProduct.price}</div>
              <div>Quantity: {item.quantity}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
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

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  unconnectedCart
)
