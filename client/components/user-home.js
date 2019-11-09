import React from 'react'
import {useSelector} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const email = useSelector(({user}) => user.email)

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

// this was exported twice in the original code. Don't know if it's used both ways!
export default UserHome
