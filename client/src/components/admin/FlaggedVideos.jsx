import React from 'react';
import FlaggedVideoList from './FlaggedVideoList';

export default class FlaggedVideos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged : [],
      authenticated: false
    }
  }

  componentWillMount() {
    // checks to make sure the user is signed in and has a user type of 2 which
    // is a super user or higher
    const token = localStorage.getItem('token');

    fetch(`/users/${ localStorage.getItem('user') }`)
      .then((currentUser)=> currentUser.json())
      .then((currentUser)=>{
        if(token === currentUser.test && currentUser.type >= 2) {
          this.setState({authenticated: true});
        }
      })
  }

  fetchFlaggedVideos() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch('/submissions/flagged')
      .then((flagged)=>flagged.json())
      .then((flagged)=>{
        console.log(flagged)
        this.setState({ flagged });
    })
  }

  componentDidMount() {
    this.fetchFlaggedVideos();
  }

  render() {
    return (
      <div>
        {this.state.authenticated ? <FlaggedVideoList flagged={ this.state.flagged }/> : <h1>You need to be a Super User or higher to access this page </h1>}
      </div>
    )
  }
}