import React from 'react';
import Voting from './Voting';
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');

export default class VideoAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log('props', props)
    this.state.points = props.points
  }

  renderPoints(points) {
    console.log('render', points)
    this.setState({points: points})
  }

  render() {
    return(
      <div className="videoactions-container">
        <span className="videolists-flexbuffer"></span>
        {this.props.link ?
          <Voting callback={this.renderPoints.bind(this)} subId={this.props.subId} link={this.props.link} />
          : null
        }
        {this.state.points ?
          <span className="videoaction-button points">{this.state.points} points</span>
          :
          null
        }

        <span className="videoaction-button points">{this.props.votes} points</span>
        <FacebookShareButton title={'hello'} url={'www.google.com'}>
          <FacebookIcon size={32} round={true}/>
        </FacebookShareButton>
        <span className="videoaction-button share">Share</span>
        <span className="videolists-flexbuffer"></span>
      </div>
    )
  }

}

