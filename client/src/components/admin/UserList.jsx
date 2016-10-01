import React from 'react';
import UserEntry from './UserEntry';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Inside User List</h1>
        { this.props.users.map((user) => {
          return <UserEntry user={user} />
        })}
      </div>
    )
  }
}