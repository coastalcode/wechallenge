import React from 'react';
import Voting from './Voting';

export default class VideoAction extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="videoactions-container">
        <span className="videolists-flexbuffer"></span>
        {this.props.link ?
          <Voting subId={this.props.subId} link={this.props.link} />
          :
          null
        }
        <span className="videoaction-button points">{this.props.votes} points</span>
        <span className="videoaction-button share">Share</span>
        <span className="videolists-flexbuffer"></span>
      </div>
    )
  }

}

