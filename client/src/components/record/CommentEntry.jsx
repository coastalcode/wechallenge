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

    fetch(`/users/${ this.props.comment.UserId }`)
      .then((user)=> user.json())
      .then((user)=>{
        this.setState({ user });
    })
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  render() {
    return (
      <p>
        { this.props.comment.title }
        <br/>
        { this.props.comment.description }
        <br/>
        Posted by: { this.state.user.username }
      </p>
    )
  }
}