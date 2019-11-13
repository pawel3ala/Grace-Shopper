import React, {useEffect} from 'react'
import {
  fetchItems,
  addAnItem, // do we need this as part of the cart?
  deleteItem,
  changeItem
} from '../store/cart'
import {useDispatch, useSelector} from 'react-redux'
import {priceFormat} from '../../script/helperFuncs'
import {Grid, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export const Cart = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  const handleChange = event => {
    const productId = event.target.name
    let quantity
    if (+event.target.value > event.target.max) {
      //Won't let user enter quantity greater than product quantity or less than 1
      quantity = event.target.max
    } else if (+event.target.value <= 0) {
      quantity = 1
    } else {
      quantity = +event.target.value
    }
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
  const backToCatalog = () => {
    props.history.push('/catalog')
  }

  const cartProp = useSelector(({cart}) => cart) || []
  let cartAll
  cartProp === undefined ? (cartAll = [0]) : (cartAll = cartProp)
  let cart = cartAll.filter(cartItem => cartItem.orderId === null)
  return cart.length > 0 ? (
    <Grid padded centered>
      <Grid.Row as="h1" style={{paddingLeft: '0.5em'}}>
        Shopping Cart
      </Grid.Row>
      {cart.map(item => {
        console.log(item)
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
              <Grid.Row>Price: {priceFormat(item.price)}</Grid.Row>
              <Grid.Row verticalAlign="middle">
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
                  <Button
                    type="button"
                    onClick={handleDelete}
                    style={{marginLeft: '0.3em'}}
                    color="red"
                    size="mini"
                  >
                    Remove from cart
                  </Button>
                </form>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        )
      })}
      <Grid.Row>
        <Grid.Column width={3}>
          <Button color="blue" onClick={backToCatalog}>
            Back to Catalog
          </Button>
        </Grid.Column>
        <Grid.Column width={3}>
          <Link to="/checkout">
            <Button color="yellow" type="button" floated="right">
              Proceed to Checkout
            </Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    <Grid centered as="h1">
      <Grid.Column
        width={16}
        textAlign="center"
        style={{color: 'red', paddingTop: '7em'}}
      >
        Cart is Empty
      </Grid.Column>
    </Grid>
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
