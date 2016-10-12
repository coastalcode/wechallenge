import React from 'react';
import UserPic from './../home/UserPic';

export default class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userPic: null
    }
  }

  fetchUserPic(id) {
     fetch('/images/' + id)
       .then((res)=> res.json())
       .then((image)=> {
         this.setState({ userPic: image.json })
       })
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
        this.fetchUserPic(user.id)
    })
  }

  componentDidMount() {
    this.fetchCurrentUser();
  }

  deleteComment() {
    let that = this;
    return fetch(`/comments/${ this.props.comment.id }`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'delete',
    }).then(function(response) {
      that.props.fetchComments();
    })
  }


  render() {
    console.log("look at me!", this.props.comment.UserId, this.props.currentUser.id)
    return (
      <div className="commententry">

        <span className="title">{ this.props.comment.title }</span>
        <br/>
        { this.props.comment.description }

        <UserPic user={ this.props.comment.User.id } username={ this.props.comment.User.username }/>

        { ( this.props.comment.UserId === this.props.currentUser.id ) ?
        <button onClick={ event=> this.deleteComment() }> Delete </button>
        : null }

      </div>
    )
  }
}
