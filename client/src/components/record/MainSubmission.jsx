import React from 'react';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

import MainSubmissionVideo from './MainSubmissionVideo';
import MainSubmissionInfo from './MainSubmissionInfo';
import { Link } from 'react-router';
import VideoActions from '../home/VideoActions';

export default class SubmissonEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged: false,
      flagging: false,
      showModal: false
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

  clickFlagged() {
    this.setState({ flagging: true })
  }

  unclickFlagged() {
    this.setState({ flagging: false })
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
          null :
          <div> This video is currently under review, please watch at your own discretion. </div> }

      <Modal show={this.state.flagging} onHide={this.unclickFlagged.bind(this)}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="flagvideomodal">
            Please explain briefly why you are flagging this video. <br/><br/>
            <input onChange={ event=> this.setState({ reason: event.target.value }) }/>
            <button onClick={ event=> this.flagVideo() } >Flag!</button>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.unclickFlagged.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>

        <div className="mainsubmission">
        <center>
          <div className="mainsubmission mainsubtop">
            <div className="mainsubmission-flexbuffer"></div>
            <MainSubmissionVideo submission={ this.props.submission } />

            { (true) ? <VideoActions className="video-actions"
              title={this.props.submission.title}
              subId={this.props.submission.id}
              link={this.props.submission.link}
              votes={this.props.submission.votes}
              comments={this.props.submission.comments}
              rid={this.props.submission.Record.id}
              clickFlagged={ this.clickFlagged.bind(this) }
              nomore={ true } /> : null }

          </div>
        </center>
        <MainSubmissionInfo
          comments={ this.props.comments }
          fetchComments={ this.props.fetchComments }
          currentUser={ this.props.currentUser }
          submission={ this.props.submission }
          record={ this.props.record }
          cid={ this.props.cid }/>
        </div>

      </div>
    )
  }
}