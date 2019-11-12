import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleOrder} from '../store/singleOrder'

// Items with quantity and subtotal
// Link to the original product detail page
// ...so that I can remember exactly what I ordered and when

export const singleOrder = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleOrder(props.match.params.orderId))
  }, [])

  const singleOrderItems = useSelector(({singleOrder}) => singleOrder)

  console.log('singleOrder', singleOrder)

  return (
    <div>
      <div className="allProducts">
        <ul>
          {singleOrderItems.map(item => (
            <li key={item.id}>
              <div>
                <div className="productDiv">
                  <Link to={`/product/${item.productId}`}>
                    <div>Product id: {item.productId}</div>
                  </Link>
                  <div>Quantity: {item.quantity} </div>
                  <div>Price: {item.price} </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
