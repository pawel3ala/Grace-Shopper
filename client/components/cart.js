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
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.fetchItems()
  }
  handleChange(event) {
    const productId = event.target.name
    const quantity = event.target.value
    const itemObj = {
      productId,
      quantity
    }
    this.props.changeItem(itemObj)
    this.props.fetchItems()
  }
  handleDelete(event) {
    const productId = event.target.previousSibling.name
    const quantity = event.target.previousSibling.value
    const itemObj = {
      productId,
      quantity
    }
    this.props.deleteItem(itemObj)
    this.props.fetchItems()
  }
  render() {
    const cart = this.props.cart.cartItems
      ? this.props.cart
      : {cartItems: [], products: []}
    return (
      <div className="cartContainer">
        {cart.cartItems.sort((a, b) => a.productId - b.productId).map(item => {
          const selectedProduct = this.props.cart.products.find(
            product => product.id === item.productId
          )
          return (
            <div key={item.productId} className="productCart">
              <img src={selectedProduct.image} />
              <div>Name: {selectedProduct.name}</div>
              <div>Price: {selectedProduct.price}</div>
              <div>
                Quantity:{' '}
                <form>
                  <input
                    name={item.productId}
                    type="number"
                    value={item.quantity}
                    onChange={this.handleChange}
                  />
                  <button type="button" onClick={this.handleDelete}>
                    Remove from cart
                  </button>
                </form>
              </div>
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
