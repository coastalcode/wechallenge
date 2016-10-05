import React from 'react';
import CCommentList from './CCommentList';
import { Link } from 'react-router';

export default class SubmissonEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  flagVideo () {
    fetch(`/submissions/flag/${ this.props.submission.id }`)
      .then((flagged)=>{
        console.log("You flagged a video! Nice!")
    })
  }

  render() {
    let url = `https://www.youtube.com/embed/${ this.props.submission.link }`
    let challenge = `/challenge/${ this.props.submission.id }`
    return (
      <div>
        { this.props.submission.title }
        <br/>
        <iframe width="560" height="315" src={ url } frameBorder="0" allowFullScreen></iframe>
        <br />
        <Link to={ challenge }>
        <button> Challenge! </button>
        </Link>
        <br />
        <button onClick={event=>{ this.flagVideo() }} > { this.props.submission.official === 1 ? "Flag this video" : "Unflag this video" } </button>
        <CCommentList
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }/>
      </div>
    )
  }
}