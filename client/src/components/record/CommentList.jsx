import React from 'react';
import CommentEntry from './CommentEntry';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments : [ { key: 1, title: 'Comment1', comment: 'This is comment #1. Blah, blah blah, blah', user: 'CoastalCode'}, { key: 2, title: 'Comment2', comment: 'This is comment #2. Blah, blah blah, blah', user: 'CC'} ],
      nextKey: 3,
      newTitle: "",
      newDescription: ""
    }

  }

  componentDidMount() {
    console.log("CommentList successfully mounted!")
  }

  addComment(comment) {
    let comments = this.state.comments.slice()
    comment.key = this.state.nextKey
    comments.push(comment)
    this.setState({ comments })

    let nextKey = this.state.nextKey + 1
    this.setState({ nextKey })
  }

  fetchUser() {
    return localStorage.getItem('user')
  }

  render() {
    return (
      <div className="commentList">
        { this.state.comments.map((comment) => <CommentEntry key={ comment.key } comment={ comment }/>) }
        <br/>
        <input onChange={ event => this.setState({ newTitle: event.target.value}) } />
        <input onChange={ event => this.setState({ newDescription: event.target.value}) } />
        <button onClick={ event =>{ this.addComment({ title: this.state.newTitle, comment: this.state.newDescription, user: this.fetchUser() }) }}>
          add a comment!
        </button>
      </div>
    )
  }
}