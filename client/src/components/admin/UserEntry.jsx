import React from 'react';

export default class UserEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>User</h1>
        <h1>{this.props.user.username}</h1>
        <h1>Email</h1>
        <h1>{this.props.user.email}</h1>
      </div>
    )
  }
}