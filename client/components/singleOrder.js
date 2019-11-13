import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Grid, Image, Button} from 'semantic-ui-react'
import {fetchSingleOrder} from '../store/singleOrder'

// Items with quantity and subtotal
// Link to the original product detail page
// ...so that I can remember exactly what I ordered and when

export const singleOrder = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleOrder(props.match.params.orderId))
  }, [])

  let singleOrderItems = useSelector(({singleOrder}) => singleOrder)

  console.log('singleOrder', singleOrder)

  if (singleOrderItems.length === 0) {
    singleOrderItems = [0]
  }

  return (
    <div>
      <h1 id="singleOrderHeader">
        Order No. {singleOrderItems[0].orderId} Details:
      </h1>
      <br />
      <div className="singleOrderProducts">
        {singleOrderItems.map(item => {
          const price = String(item.price * item.quantity)
          return (
            <div key={item.productId}>
              <div>
                <div className="productDiv">
                  <Link to={`/product/${item.productId}`}>
                    <img src={item.image} className="allProductImg" />
                  </Link>
                  <br />
                  <div className="singleOrderProductDetails">
                    <Link to={`/product/${item.productId}`}>
                      <div>Item: {item.name}</div>
                    </Link>
                    <br />
                    <div>Quantity: {item.quantity} </div>
                    <br />
                    <div>
                      Subtotal: ${price.slice(0, price.length - 2)}.{price.slice(
                        price.length - 2
                      )}{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
