import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Grid, Image} from 'semantic-ui-react'
import {fetchSingleOrder} from '../store/singleOrder'
import {priceFormat} from '../../script/helperFuncs'

// Items with quantity and subtotal
// Link to the original product detail page
// ...so that I can remember exactly what I ordered and when

export const singleOrder = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleOrder(props.match.params.orderId))
  }, [])

  let singleOrderItems = useSelector(({singleOrder}) => singleOrder)

  if (singleOrderItems.length === 0) {
    singleOrderItems = [0]
  }

  return (
    <Grid padded centered>
      <Grid.Row as="h1" style={{paddingLeft: '0.5em'}}>
        Order No. {singleOrderItems[0].orderId} Details:
      </Grid.Row>
      {singleOrderItems.map(item => {
        const price = String(item.price * item.quantity)
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
              <Grid.Row verticalAlign="middle">
                Quantity: {item.quantity}
              </Grid.Row>
              <Grid.Row>Subtotal: {priceFormat(price)}</Grid.Row>
            </Grid.Column>
          </Grid.Row>
        )
      })}
    </Grid>
  )
}
