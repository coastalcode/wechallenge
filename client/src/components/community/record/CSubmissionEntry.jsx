import React from 'react';
import CCommentList from './CCommentList';
import { Link } from 'react-router';

export default class CSubmissonEntry extends React.Component {
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
    return (
      <div>
        { this.props.submission.title }
        <br/>
        <iframe width="560" height="315" src={ url } frameBorder="0" allowFullScreen></iframe>
        <br />
        { (this.props.submission.official === 1) ? <button onClick={event => this.flagVideo() } ><i className="fa fa-flag" aria-hidden="true"></i></button> : null }
        <CCommentList
        currentUser={ this.props.currentUser }
        submission={ this.props.submission }
        cid={ this.props.cid } />
       </div>
    )
  }
}