import React from 'react';
import CCommentEntry from './CCommentEntry';

export default class CCommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: "",
      newDescription: "",
      comments: []
    }
  }

  fetchComments() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/communities/comments?sid=${ this.props.submission.id }&cid=${ this.props.cid }`)
      .then((comments)=> comments.json())
      .then((comments)=>{
        this.setState({ comments });
        console.log(comments)
    })
  }

  postComment(comment) {
    return fetch('/communities/comments', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(comment)
    }).then(function(response) {
        console.log(response);
    })
  }

  componentDidMount() {
    this.fetchComments();
  }

  addComment(title, description) {
    let comment = {
      title: title,
      description: description,
      userId: this.props.currentUser.id,
      submissionId: this.props.submission.id,
      communityId: this.props.cid
    }
    console.log("comment to be added", comment)
    this.postComment(comment)
    .then((data)=> this.fetchComments());
  }

  render() {
    let userId = this.props.currentUser.id
    return (true) ? (
      <div className="commentList">
        { this.state.comments.map((comment) =>
          <CCommentEntry
            key={ comment.id }
            comment={ comment }
            fetch={ this.fetchComments.bind(this) }/>) }
        { userId ? (<div><br/>
        <input placeholder="title" onChange={ event => this.setState({ newTitle: event.target.value}) } />
        <br/>
        <input placeholder="comment" onChange={ event => this.setState({ newDescription: event.target.value}) } />
        <br/>
        <button onClick={ event =>{ this.addComment(this.state.newTitle, this.state.newDescription) }}>
          Add a comment!
        </button></div>) : "Login to comment!" }
      </div>
    ) : null
  }
}