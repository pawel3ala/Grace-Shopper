import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Grid, Icon} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Grapefruit</h1>
    <div className="slogan">
      <h4>"They're Gr-r-reat Fruit!!"</h4>
      <div id="tm">
        <h6>TM</h6>
      </div>
    </div>
    <nav>
      {isLoggedIn ? (
        <Grid>
          {/* The navbar will show these links after you log in */}
          <Grid.Column>
            <Link to="/home">Home</Link>
          </Grid.Column>
          <Grid.Column>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </Grid.Column>

          <Grid.Column>
            <Link to="/order">Orders</Link>
          </Grid.Column>

          <Grid.Column
            verticalAlign="middle"
            floated="right"
            width={3}
            textAlign="right"
          >
            <Link to="/catalog">
              <Icon name="th" size="big" />
            </Link>
            <Link to="/cart">
              <Icon name="shop" size="big" />
            </Link>
          </Grid.Column>
        </Grid>
      ) : (
        <Grid>
          {/* The navbar wll show these links before you log in */}
          <Grid.Column>
            <Link to="/home">Home</Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/login">Login</Link>
          </Grid.Column>
          <Grid.Column width={2}>
            <Link to="/signup">Sign Up</Link>
          </Grid.Column>
          <Grid.Column
            verticalAlign="middle"
            floated="right"
            width={3}
            textAlign="right"
          >
            <Link to="/">
              <Icon name="th" size="big" />
            </Link>
            <Link to="/cart">
              <Icon name="shop" size="big" />
            </Link>
          </Grid.Column>
        </Grid>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
