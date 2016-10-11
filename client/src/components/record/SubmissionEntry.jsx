import React from 'react';
import SubmissionEntryVideo from './SubmissionEntryVideo';
import SubmissionEntryInfo from './SubmissionEntryInfo';
import { Link } from 'react-router';
import VideoActions from '../home/VideoActions';

export default class SubmissonEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged: false
    };
  }

  flagVideo () {
    let flaggedVideo = {
      reason: "here is the reason",
      userid: this.props.currentUser.id,
      submissionid: this.props.submission.id
    }

    fetch('/flagvideo', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(flaggedVideo)
    }).then(function(response) {
      console.log("added a flagged video")
    })

    fetch(`/submissions/flag/${ this.props.submission.id }`)
      .then((flagged)=>{
        this.props.submission.official = 0;
        this.setState({ flagged: true })
    })
  }

  render() {
    return (
      <div >

        Submission Title: { this.props.submission.title }

        { (this.state.flagged) ? <div> Thanks for flagging the video! </div> : null }


        { (this.props.submission.official === 1) ?
          <div><button onClick={event => this.flagVideo() } >
            <i className="fa fa-flag" aria-hidden="true"/> Flag this video.
          </button></div> :
          <div> This video is currently under review, please watch at your own discretion. </div> }

        <VideoActions className="video-actions" title={this.props.submission.title} subId={this.props.submission.id} link={this.props.submission.link} votes={this.props.submission.votes} comments={this.props.submission.comments} />

        <div className="indivrecord-entry">
        <SubmissionEntryVideo submission={ this.props.submission } />

        <SubmissionEntryInfo
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }
          record={ this.props.record }
          cid={ this.props.cid }/>
        </div>

      </div>
    )
  }
}