import React from 'react';

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
      <div>
        { this.props.comment.title }
        <br/>
        { this.props.comment.description }
        <br/>
        Posted by: { this.props.comment.User.username }
        { this.state.userPic ?
          <img className="comment--userPic" src={this.state.userPic} />
          : null }
        <br/>
        { ( this.props.comment.UserId === this.props.currentUser.id ) ?
        <button onClick={ event=> this.deleteComment() }> Delete </button>
        : null }
      </div>
    )
  }
}
