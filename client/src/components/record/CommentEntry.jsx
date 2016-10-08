import React from 'react';

export default class CommentEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  deleteComment() {
    let that = this;
    return fetch(`/comments/${ this.props.comment.id }`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'delete',
        // body: JSON.stringify(comment)
    }).then(function(response) {
      that.props.fetchComments();
    })
  }


  render() {
    console.log("look at me!", this.props.comment.UserId, this.props.currentUser.id)
    return (
      <div>
        <br />
        { this.props.comment.title }
        <br/>
        { this.props.comment.description }
        <br/>
        Posted by: { this.props.comment.User.username }
        <br/>
        { ( this.props.comment.UserId === this.props.currentUser.id ) ?
        <button onClick={ event=> this.deleteComment() }> Delete </button>
        : null }
      </div>
    )
  }
}