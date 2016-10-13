import React from 'react';
import UserPic from './../home/UserPic';

export default class OtherSubmissionsListEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  return (
    <div onClick={ event => { this.props.setMainVideo(this.props.subindex); this.props.fetchComments(this.props.submission.id) } } className="othersublist-entry">
      <img
        src={ "http://img.youtube.com/vi/" + this.props.submission.link + "/hqdefault.jpg" }/>



      <div>
      { (this.props.random) ? null : (<div>
        { (this.props.subindex === 0) ? <img src='/images/First.png'/> : null }
        { (this.props.subindex === 1) ? <img src='/images/Second.png'/> : null }
        { (this.props.subindex === 2) ? <img src='/images/Third.png'/> : null }
      </div>)}

      <div className="title">{ this.props.submission.title }</div>
      <br/>
      { this.props.submission.Record.category }
      <br/>
      { this.props.submission.measurement } { this.props.submission.Record.units }

      <br/>
      { (this.props.submission.duration==="current winner!") ? <div>This is the current holder of this record!</div> : null }

      { (this.props.submission.duration && this.props.submission.duration!=="current winner!") ? <div>This submission was first place for { this.props.submission.duration }!</div> : null }
      <UserPic user={ this.props.submission.User.id } username={ this.props.submission.User.username }/>
      </div>
    </div>
  )}
}



