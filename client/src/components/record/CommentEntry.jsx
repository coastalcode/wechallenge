import React from 'react';

export default class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("CommentEntry successfully mounted!")
  }

  render() {
    return (
      <div>
        { this.props.comment.title }
        <br/>
        { this.props.comment.comment }
        <br/>
        Posted by: { this.props.comment.user }
      </div>
    )
  }
}