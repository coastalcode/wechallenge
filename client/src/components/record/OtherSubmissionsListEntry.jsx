import React from 'react';

export default class OtherSubmissionsListEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  return (
    <div className="othersublist-entry">
      <img
        onClick={ event => this.props.setMainVideo(this.props.subindex) }
        src={ "http://img.youtube.com/vi/" + this.props.submission.link + "/hqdefault.jpg" }/>
      <div>
      { this.props.submission.title }
      <br/>
      { this.props.submission.Record.category }
      <br/>
      { this.props.submission.measurement } { this.props.submission.Record.units }

      <br/>
      { (this.props.submission.duration) ? <div>{ this.props.submission.duration }</div> : null }
      </div>
    </div>
  )}
}



