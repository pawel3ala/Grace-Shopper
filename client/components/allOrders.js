import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
// import {fetchOrders} from '../store/orders'

const dummyOrders = [
  {
    id: 1,
    status: 'Shipping',
    totalPrice: 12,
    createdAt: '12-02-2019',
    shipToAddress: '1234 Test Street',
    billToAddress: '1234 Test Street',
    userId: 2
  },
  {
    id: 2,
    status: 'Shipped',
    totalPrice: 24,
    createdAt: '10-10-2018',
    shipToAddress: '1234 Test Street',
    billToAddress: '1234 Test Street',
    userId: 2
  }
]

export const AllOrders = props => {
  // const [page, setPage] = useState(1)
  // const [limit, setLimit] = useState(10)
  // const [sort, setSort] = useState('id.ASC')
  // const [search, setSearch] = useState('')
  // const [category, setCategory] = useState('')
  // const [price, setPrice] = useState({})
  // const [review, setReview] = useState({})
  // const query = {
  //   page,
  //   limit,
  //   sort,
  //   ...(search && {search}),
  //   ...(category && {category}),
  //   ...(Object.entries(price).length > 0 && {price}),
  //   ...(Object.entries(review).length > 0 && {review})
  // }
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchOrders(query))
  // }, [])

  // const catalog = useSelector(({catalog}) => catalog)
  return (
    <div>
      <div className="allProducts">
        {dummyOrders.map(order => (
          <div key={order.id}>
            <div className="productDiv">
              {/* <Link to={`/order/${order.id}`}> */}
              <div>Order Number: {order.id}</div>
              {/* </Link> */}
              <div>Order Status: {order.status} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
