import React from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid, Image} from 'semantic-ui-react'
import {priceFormat} from '../../script/helperFuncs'

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
      <Grid padded centered>
        <Grid.Row as="h1" style={{paddingLeft: '0.5em'}}>
          Review Items
        </Grid.Row>
        {cart.length > 0 ? (
          cart.map(item => {
            const price = String(item.price)
            const itemSubtotal = item.price * item.quantity
            const displayItemSubtotal = String(itemSubtotal)
            return (
              <Grid.Row key={item.productId}>
                <Grid.Column width={2}>
                  <Link to={`/product/${item.productId}`}>
                    <Image src={item.image} size="small" bordered circular />
                  </Link>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Grid.Row>
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  </Grid.Row>
                  <Grid.Row>Unit Price: {priceFormat(price)}</Grid.Row>
                  <Grid.Row verticalAlign="middle">
                    Quantity:{' '}
                    <input
                      name={item.productId}
                      type="number"
                      min="1"
                      max={item.productQuantity}
                      value={item.quantity}
                      onChange={this.handleChange}
                    />
                  </Grid.Row>
                  <Grid.Row>
                    Item Subtotal: {priceFormat(displayItemSubtotal)}
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            )
          })
        ) : (
          <Grid centered as="h1">
            <Grid.Column
              width={16}
              textAlign="center"
              style={{color: 'red', paddingTop: '7em'}}
            >
              No Items To Checkout!
            </Grid.Column>
          </Grid>
        )}
      </Grid>
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
