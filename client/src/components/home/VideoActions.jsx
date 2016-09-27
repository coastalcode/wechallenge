import React from 'react';

export default class VideoAction extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="videoactions-container">
        <span className="videolists-flexbuffer"></span>
        <span className="videoaction-button points">100 points</span>
        <span className="videoaction-button comments">Comments: 99</span>
        <span className="videoaction-button watch">Watch</span>
        <span className="videoaction-button share">Share</span>
        <span className="videolists-flexbuffer"></span>
      </div>
    )
  }

}

