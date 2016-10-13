import React from 'react';
import UserList from './UserList';
import SearchBar from './SearchBar';

export default class AdminControls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      search: "",
      authenticated: false
    }
  }

  // grabs all users from database and adds them to the state users
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

  // This checks to insure that the user who is logged in has a user type of
  // 3 or higher which is an admin level or higher
  componentWillMount() {
    const token = localStorage.getItem('token');

    fetch(`/users/${ localStorage.getItem('user') }`)
      .then((currentUser)=> currentUser.json())
      .then((currentUser)=>{
        if(token === currentUser.test && currentUser.type >= 3) {
          this.setState({authenticated: true});
        }
      })
  }

  componentDidMount() {
    this.fetchUsers()
  }

  updateSearchTerm(search) {
    this.setState({search})
  }

  // Used to check what matches the search term
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
      <div className="admincontrols-container">
        {this.state.authenticated ? <div> <h1>Welcome to Admin Controls</h1>
        <SearchBar updateSearchTerm={ this.updateSearchTerm.bind(this) } />
        <UserList
          users={ this.state.users }
          search={ this.state.search }
          checkForMatching={ this.checkForMatching }
        /> </div> : <h1>You need to be an Admin User to access this page </h1> }
      </div>
    )
  }
}