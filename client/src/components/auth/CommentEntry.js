import React from 'react';
import { Link } from 'react-router';

export default class CommentEntry extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }

  render() {
    let dateObj = new Date(this.props.data.createdAt);
    let path = `/record?id=${ this.props.data.Submission.RecordId }`;
    return(
      <div className="comments-container--flexbox">
        <Link to={path}><h3>Record: {this.props.data.Submission.title}</h3></Link>
        <div>Title: {this.props.data.title}</div>
        <div>Comment: {this.props.data.description}</div>
        <div>Date: {dateObj.toLocaleString()}</div>
      </div>
    )
  }
}