import React from 'react';
import Voting from './Voting';
import { ShareButtons, generateShareIcon } from 'react-share';
import { Link } from 'react-router';

const { FacebookShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');

export default class VideoAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log('props', props)
    this.state.points = props.votes
  }

  renderPoints(points) {
    console.log('render', points)
    this.setState({points: points})
  }

  render() {
    let path = `/record?rid=${ this.props.rid }`
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
          <span className="videoaction-button points">{this.props.votes} points</span>
        }
        <span className="videoaction-button share">
          <FacebookShareButton
            className="facebookShare-button"
            title={'Check out this submission on weChallenge!'}
            url={'wechallenge.herokuapp.com/record?rid=' + this.props.subId}
            description={this.props.title}>Share
            <FacebookIcon className="facebookShare-icon" size={25} round={true}/>
          </FacebookShareButton>
        </span>

        { (this.props.nomore) ? <span className="videoaction-button flag" onClick={ event=> this.props.clickFlagged() }>Flag</span>
          : <Link className="videoaction-button more"
          to={ path }>More</Link>  }
        <span className="videolists-flexbuffer"></span>
      </div>
    )
  }

}

