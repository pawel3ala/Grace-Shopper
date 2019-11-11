import React, {useEffect} from 'react'
// import {useSelector, useDispatch} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {fetchCatalog} from '../store/catalog'

export const Sidebar = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>{/* form body */}</form>
)

export default reduxForm({form: 'query'})(Sidebar)
