import React from 'react';

export default class CommentEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: {} }
  }

  fetchCurrentUser() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/users/${ this.props.bulletin.UserId }`)
      .then((user)=> user.json())
      .then((user)=>{
        this.setState({ user });
    })
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  deleteComment() {
    let that = this;
    return fetch(`/comments/${ this.props.bulletin.id }`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'delete',
        // body: JSON.stringify(bulletin)
    }).then(function(response) {
        console.log(response);
    }).then(function(response) {
      that.props.fetch();
    })
  }

  pinComment() {
    let that = this;
    return fetch(`/bulletins/pin/${ this.props.bulletin.id }`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'put',
        // body: JSON.stringify(bulletin)
    }).then(function(response) {
        console.log(response);
    }).then(function(response) {
      that.props.fetch();
    })
  }

  render() {

    return (
      <p>
        { this.props.bulletin.pinned ? (<i className="fa fa-thumb-tack" aria-hidden="true"></i>) : null }
        <br />
        { this.props.bulletin.subject }
        <br/>
        { this.props.bulletin.message }
        <br/>
        Posted by: { this.state.user.username }
        <br/>
        <button onClick={ event=> this.deleteComment() }>Delete Button</button>
        <button onClick={ event=> this.pinComment() }>Toggle Pin</button>
      </p>
    )
  }
}