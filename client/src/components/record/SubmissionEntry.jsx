import React from 'react';
import SubmissionEntryVideo from './SubmissionEntryVideo';
import SubmissionEntryInfo from './SubmissionEntryInfo';
import { Link } from 'react-router';

export default class SubmissonEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged: false
    };
  }

  flagVideo () {
    fetch(`/submissions/flag/${ this.props.submission.id }`)
      .then((flagged)=>{
        this.props.submission.official = 0;
        this.setState({ flagged: true })
    })
  }

  render() {
    return (
      <div>
        Submission Title: { this.props.submission.title }

        { (this.state.flagged) ? <div> Thanks for flagging the video! </div> : null }

        { (this.props.submission.official === 1) ?
          <div><button onClick={event => this.flagVideo() } >
            <i className="fa fa-flag" aria-hidden="true"/> Flag this video.
          </button></div> :
          <div> This video is currently under review, please watch at your own discretion. </div> }

        <SubmissionEntryVideo submission={ this.props.submission } />
        <br/>
        <SubmissionEntryInfo
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }
          record={ this.props.record }/>
        <br/>

      </div>
    )
  }
}