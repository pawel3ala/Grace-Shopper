import React, {useEffect} from 'react'
import {
  fetchItems,
  addAnItem, // do we need this as part of the cart?
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export const Cart = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  const handleChange = event => {
    const productId = event.target.name
    const quantity = Number(event.target.value)
    const itemObj = {
      productId,
      quantity
    }
    dispatch(changeItem(itemObj))
  }
  const handleDelete = event => {
    const productId = event.target.previousSibling.name
    const quantity = event.target.previousSibling.value
    const itemObj = {
      productId,
      quantity
    }
    dispatch(deleteItem(itemObj))
  }
  const cart = useSelector(({cart}) => cart) || []
  return (
    <div className="cartContainer">
      {cart.length > 0
        ? cart.map(item => {
            return (
              <div key={item.productId} className="productCart">
                <img src={item.image} />
                <div>Name: {item.name}</div>
                <div>Price: {item.price}</div>
                <div>
                  Quantity:{' '}
                  <form>
                    <input
                      name={item.productId}
                      type="number"
                      min="1"
                      max={item.productQuantity}
                      value={item.quantity}
                      onChange={handleChange}
                    />
                    <button type="button" onClick={handleDelete}>
                      Remove from cart
                    </button>
                  </form>
                </div>
              </div>
            )
          })
        : 'Cart is Empty'}
      <Link to="/checkout">
        <button type="button">Proceed to Checkout</button>
      </Link>
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     cart: state.cart
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchItems: () => dispatch(fetchItems()),
//     addToCart: item => dispatch(addAnItem(item)),
//     deleteItem: item => dispatch(deleteItem(item)),
//     changeItem: item => dispatch(changeItem(item)),
//     clearCart: () => dispatch(clearAllItems())
//   }
// }
