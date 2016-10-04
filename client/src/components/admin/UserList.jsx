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
        <div className="container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Frozen</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                { this.props.users.map((user) => {
                  if (this.props.checkForMatching([user.username, user.email, user.type], this.props.search)) {
                    return <UserEntry user={user} />
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
