import React from 'react';
import CommentEntry from './CommentEntry';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="indivrecord-commentlist">
        { (this.props.comments.length > 0) ? this.props.comments.map((comment) =>
          <CommentEntry
            key={ comment.id }
            comment={ comment }
            currentUser={ this.props.currentUser }
            fetchComments={ this.props.fetchComments }/>) : "No comments yet! Be the first to post one!"}
      </div>
    )
  }
}