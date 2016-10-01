import React from 'react';

export default class AdminControls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }
  }

  fetchUsers() {
    $.ajax({
      url: '/users',
      method: 'GET',
    })
    .done((users) => {
      console.log('users: ', users);
    })
    .fail((msg) => {
      console.log('failed to fetch users: ', msg);
    })
  }

  render() {
    this.fetchUsers()
    return (
      <h1>Inside of Admin Controls</h1>
    )
  }
}