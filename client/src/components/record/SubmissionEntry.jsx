import React from 'react';
import CommentList from './CommentList';

export default class SubmissonEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  flagVideo () {
    console.log(this.props.submission.id)
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/submissions/flag/${ this.props.submission.id }`)
      .then((flagged)=>{
        console.log("You flagged a video! Nice!")
    })
  }

  render() {
    let url = `https://www.youtube.com/embed/${ this.props.submission.link }`
    return (
      <div>
        { this.props.submission.title }
        <br/>
        <iframe width="560" height="315" src={ url } frameBorder="0" allowFullScreen></iframe>
        <br />
        <button onClick={event=>{ this.flagVideo() }} >Flag this video</button>
        <CommentList
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }/>
      </div>
    )
  }
}