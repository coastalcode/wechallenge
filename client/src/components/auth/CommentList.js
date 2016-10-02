import React from 'react';
import CommentEntry from './CommentEntry';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return(
      <div>
        <h2>Comment History</h2>
        { this.props.data.map((comment, i)=>{
          return <CommentEntry key={i} data={comment} />
        })}
      </div>
    )
  }
}