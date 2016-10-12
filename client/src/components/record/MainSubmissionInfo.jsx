import React from 'react';
import CommentView from './CommentView';
import { Link } from 'react-router';

export default class MainSubmissionInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultView: true
    };
  }

  render() {
    return (
      <div>
          <div>
            { (this.props.submission.duration==='current winner!') ?
            <div className="iscurrentwinner">
              <img src='/images/FirstPlace.png'/>
              <span> Current winner! </span> This video has held this record since { moment(this.props.submission.createdAt).format("MMM Do YYYY") }! Think you can beat them?
            </div> : null }

            <div className="videoinfo">
              <div className="title">{ this.props.submission.title } <span> { this.props.submission.measurement } { this.props.record.units } </span></div>
              <br/>
              { this.props.submission.description }

            </div>
          </div>
          <div className="videocomments">
            <div className="title">Comments</div>
            <div>
              <CommentView
                currentUser={ this.props.currentUser }
                submission={ this.props.submission }
                cid={ this.props.cid }/>
            </div>
          </div>
      </div>
    )
  }
}
