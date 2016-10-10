import React from 'react';

export default class CommentAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      newTitle: "",
      newDescription: ""
    }
  }

  addComment(title, description) {
    let comment = {
      title: title,
      description: description,
      userId: this.props.currentUser.id,
      submissionId: this.props.submission.id
    }

    if (this.props.cid) {
      comment.communityId = this.props.cid
    }

    this.props.postComment(comment)
    .then((data)=> this.props.fetchComments())
    .then((data)=> {
      this.setState({ newTitle: "", newDescription: "" })
      this.props.switchView();
    })
  }

  render() {
    return (
      <div className="indivrecord-commentadd">
      { (this.props.currentUser.id) ?
      <div>
        <input
          placeholder="title"
          value={ this.state.newTitle }
          onChange={ event => this.setState({ newTitle: event.target.value}) } />
        <br/>
        <input
          placeholder="comment"
          value={ this.state.newDescription }
          onChange={ event => this.setState({ newDescription: event.target.value}) } />
        <br/>
        <button
          onClick={ event =>{ this.addComment(this.state.newTitle, this.state.newDescription) }}>
          Add a comment!
        </button>
      </div> : "Login to comment!" }
      </div>
    )
  }
}