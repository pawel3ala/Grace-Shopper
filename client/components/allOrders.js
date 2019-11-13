import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from '../store/orders'

export const AllOrders = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  const orders = useSelector(({orders}) => orders)

  return (
    <div>
      <div className="allProducts">
        {orders.map(order => (
          <div key={order.id}>
            <div className="productDiv">
              <Link to={`/order/${order.id}`}>
                <div>Order Number: {order.id}</div>
              </Link>
              <div>Order Total Price: {order.totalPrice} </div>
              <div>Order Status: {order.status} </div>
              <div>Created at: {order.createdAt} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
