import React from 'react';
import UserList from './UserList';
import SearchBar from './SearchBar';

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

  updateSearchTerm(search) {
    this.setState({search})
  }

  checkForMatching(checkThese, forThis) {
    let bool = false;
    if (forThis === "") {
      return true;
    }

    checkThese.forEach((item)=>{
      if (item && item.toLowerCase().indexOf(forThis.toLowerCase()) > -1) {
        bool = true;
      }
    })

    // it didn't work without this console log ..
    console.log(checkThese)
    return bool;
  }

  render() {

    return (
      <div>
        <h1>Inside of Admin Controls</h1>
        <SearchBar updateSearchTerm={ this.updateSearchTerm.bind(this) } />
        <UserList
          users={ this.state.users }
          search={ this.state.search }
          checkForMatching={ this.checkForMatching }
        />
      </div>
    )
  }
}