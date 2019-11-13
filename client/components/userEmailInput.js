import React from 'react'

class UserEmailInput extends React.Component {
  render() {
    return (
      <div>
        {this.props.emailUpdate ? (
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              name="email"
              required
              type="email"
              value={this.props.email}
              onChange={this.props.handleEmailChange}
            />
          </div>
        ) : (
          <div>E-mail: {this.props.user.email}</div>
        )}{' '}
        {this.props.emailUpdate ? null : (
          <button type="button" onClick={this.props.handleUpdateEmail}>
            Change Order Notification E-mail
          </button>
        )}
      </div>
    )
  }
}

export default UserEmailInput
