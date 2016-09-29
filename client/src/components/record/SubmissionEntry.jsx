import React from 'react';
import CommentList from './CommentList';

export default class SubmissonEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let url = `https://www.youtube.com/embed/${ this.props.submission.link }`
    return (
      <div>
        { this.props.submission.title }
        <br/>
        <iframe width="560" height="315" src={ url } frameBorder="0" allowFullScreen></iframe>
        <CommentList
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }/>
      </div>
    )
  }
}