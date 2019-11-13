import React, {useEffect} from 'react'
import {
  fetchItems,
  addAnItem,
  deleteItem,
  changeItem,
  clearAllItems
} from '../store/cart'
import {useSelector, useDispatch} from 'react-redux'
import {Grid, Image, GridColumn, Header} from 'semantic-ui-react'
import {fetchSingleOrder} from '../store/singleOrder'
import {priceFormat} from '../../script/helperFuncs'

let dummyOrder = {
  id: 3443543,
  items: [
    {
      id: 1,
      image: 'http://lorempixel.com/640/480',
      name: 'Orange Grapefruit',
      price: 34,
      quantity: 3
    },
    {
      id: 2,
      image: 'http://lorempixel.com/640/480',
      name: 'Grapefruit Tree',
      price: 100,
      quantity: 1
    }
  ],
  totalQuantity: 4,
  totalPrice: 100,
  shipToAddress: '12233 Test Street',
  billToAddress: '23232 Baker Street',
  userId: 1
}

export const OrderConfirmed = props => {
  dummyOrder = dummyOrder ? dummyOrder : {}
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleOrder(41))
  }, [])

  const singleOrderItems = useSelector(({singleOrder}) => singleOrder)

  console.log(singleOrderItems)
  return (
    <Grid centered>
      <Grid.Row>
        <Header as="h2">Thanks For Your Order!!!!</Header>
      </Grid.Row>
      {singleOrderItems.map(item => {
        return (
          <Grid.Row key={item.productId}>
            <Grid.Column width={3}>
              <Image src={item.image} />
            </Grid.Column>
            <GridColumn width={3} textAlign="left">
              <Grid.Row> {item.name}</Grid.Row>
              <Grid.Row>Price: {priceFormat(item.price)}</Grid.Row>
              <Grid.Row>Quantity: {item.quantity}</Grid.Row>
            </GridColumn>
          </Grid.Row>
        )
      })}
      <Grid.Row>
        <Grid.Column width={5} textAlign="left">
          <Grid.Row>Order Number: {dummyOrder.id}</Grid.Row>
          <Grid.Row>
            Total Quantity:
            {' ' +
              singleOrderItems.reduce((tot, item) => {
                tot += item.quantity
                return tot
              }, 0)}
          </Grid.Row>
          <Grid.Row>
            Total Price:
            {priceFormat(
              singleOrderItems.reduce((tot, item) => {
                tot += item.price
                return tot
              }, 0)
            )}
          </Grid.Row>
          {/* <Grid.Row>Shipping Address: {dummyOrder.shipToAddress}</Grid.Row>
          <Grid.Row>Billing Address: {dummyOrder.billToAddress}</Grid.Row> */}
        </Grid.Column>
      </Grid.Row>
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

// export const Cart = connect(mapStateToProps, mapDispatchToProps)(
//   unconnectedCart
// )
