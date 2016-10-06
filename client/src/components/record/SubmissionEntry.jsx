import React from 'react';
import CommentList from './CommentList';
import { Link } from 'react-router';

export default class SubmissonEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.clickedFlagged = false;
  }

  flagVideo () {
    fetch(`/submissions/flag/${ this.props.submission.id }`)
      .then((flagged)=>{
        console.log("You flagged a video! Nice!");
        console.log('this: ', this);
        this.props.submission.official = 0;
        this.setState({clickedFlagged: true});
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
        <CommentList
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }/>
      </div>
    )
  }
}