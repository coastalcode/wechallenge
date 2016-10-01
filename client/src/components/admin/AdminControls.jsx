import React from 'react';
import UserList from './UserList';

export default class AdminControls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      search: ""
    }
  }

  fetchUsers() {
    $.ajax({
      url: '/users',
      method: 'GET',
    })
    .done((users) => {
      console.log('users: ', users);
      this.setState({ users });
    })
    .fail((msg) => {
      console.log('failed to fetch users: ', msg);
    })
  }

  componentDidMount() {
    this.fetchUsers()
  }

  render() {

    return (
      <div>
        <h1>Inside of Admin Controls</h1>
        <UserList users={ this.state.users } />
      </div>
    )
  }
}