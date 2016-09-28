import React from 'react';
import CommentEntry from './CommentEntry';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments : [ { key: 1, title: 'Comment1', comment: 'This is comment #1. Blah, blah blah, blah', user: 'CoastalCode'}, { key: 2, title: 'Comment2', comment: 'This is comment #2. Blah, blah blah, blah', user: 'CC'} ],
      nextKey: 3
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

  render() {
    return (
      <div className="commentList">
        { this.state.comments.map((comment) => <CommentEntry key={ comment.key } comment={ comment }/>) }
        <br/>
        <button onClick={event=>{ this.addComment({ title: 'CommentNew', comment: 'This is a new comment', user: 'COASTALCODE'}) }}>
          add a comment!
        </button>
      </div>
    )
  }
}