import React from 'react';
import MainSubmissionVideo from './MainSubmissionVideo';
import MainSubmissionInfo from './MainSubmissionInfo';
import { Link } from 'react-router';
import VideoActions from '../home/VideoActions';

export default class SubmissonEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged: false,
      flagging: false
    };
  }

  flagVideo () {
    this.setState({ flagging: false })

    let flaggedVideo = {
      reason: this.state.reason,
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
    console.log(this.props, "look at me!!!!!")
    return (
      <div className="mainarea">

        <div className="title">
          { this.props.submission.title }
        </div>

        { (this.state.flagged) ? <div> Thanks for flagging the video! </div> : null }


        { (this.props.submission.official === 1) ?
          <div><button onClick={event => this.setState({ flagging: true }) } >
            <i className="fa fa-flag" aria-hidden="true"/> Flag this video.
          </button></div> :
          <div> This video is currently under review, please watch at your own discretion. </div> }

        { (this.state.flagging) ?
          <div>
            Please explain briefly why you are flagging this video. <br/>
            <input onChange={ event=> this.setState({ reason: event.target.value }) }/>
            <button onClick={ event=> this.flagVideo() } >Button</button>
          </div> : null }



        <div className="mainsubmission">
        <center>
        <div className="mainsubmission mainsubtop">

        <MainSubmissionVideo submission={ this.props.submission } />

        { (true) ? <VideoActions className="video-actions"
          title={this.props.submission.title}
          subId={this.props.submission.id}
          link={this.props.submission.link}
          votes={this.props.submission.votes}
          comments={this.props.submission.comments}
          rid={this.props.submission.Record.id}
          nomore={ true } /> : null }

        </div>
        </center>
        <MainSubmissionInfo
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }
          record={ this.props.record }
          cid={ this.props.cid }/>
        </div>

      </div>
    )
  }
}