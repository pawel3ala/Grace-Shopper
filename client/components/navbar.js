import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(({user}) => !!user.id)
  const handleClick = event => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      <h1>Grapefruit</h1>
      <div className="slogan">
        <h4>"They're Gr-gr-grapefruit!!"</h4>
        <div id="tm">
          <h6>TM</h6>
        </div>
      </div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
