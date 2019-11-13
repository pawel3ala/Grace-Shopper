import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Grid, Image, GridColumn, Header} from 'semantic-ui-react'
import {fetchSingleOrder} from '../store/singleOrder'
import {priceFormat} from '../../script/helperFuncs'
import {Link} from 'react-router-dom'

export const singleOrder = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleOrder(props.match.params.orderId))
  }, [])

  const singleOrderItems = useSelector(({singleOrder}) => singleOrder)
  const userInfo = useSelector(({user}) => user)
  console.log(userInfo)
  console.log(singleOrderItems)
  return singleOrderItems.length > 0 ? (
    <Grid centered>
      <Grid.Row>
        <Header as="h1">Order No. {props.match.params.orderId} Details:</Header>
      </Grid.Row>
      {singleOrderItems.map(item => {
        return (
          <Grid.Row key={item.productId}>
            <Grid.Column width={2}>
              <Link to={`/product/${item.productId}`}>
                <Image src={item.image} bordered circular size="small" />
              </Link>
            </Grid.Column>
            <GridColumn width={3} textAlign="left" verticalAlign="middle">
              <Grid.Row>
                <Link to={`/product/${item.productId}`}>{item.name}</Link>
              </Grid.Row>
              <Grid.Row>Price: {priceFormat(item.price)}</Grid.Row>
              <Grid.Row>Quantity: {item.quantity}</Grid.Row>
            </GridColumn>
          </Grid.Row>
        )
      })}
      <Grid.Row>
        <Grid.Column width={5} textAlign="left">
          <Grid.Row>Order Number: {props.match.params.orderId}</Grid.Row>
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
  ) : (
    <Grid centered>
      <Grid.Row as="h2">This order does not exist!</Grid.Row>
    </Grid>
  )
}
