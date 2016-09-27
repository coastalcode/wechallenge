import React from 'react';

export default class VideoAction extends React.Component {
  constructor(props) {
    super(props)
    console.log('props', this.props.points, this.props.comments)
  }
  render() {
    return(
      <div className="videoactions-container">
        <span className="videolists-flexbuffer"></span>
        <span className="videoaction-button points">{this.props.points} points</span>
        <span className="videoaction-button comments">{this.props.comments} comments</span>
        <span className="videoaction-button share">Share</span>
        <span className="videolists-flexbuffer"></span>
      </div>
    )
  }

}

