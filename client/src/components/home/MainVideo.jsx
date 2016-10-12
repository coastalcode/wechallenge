import React from 'react';
import Video from './Video';
import YouTube from 'react-youtube';
import VideoActions from './VideoActions';
import UserPic from './UserPic';

export default class MainVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUserVote: false
    };
  }

  componentDidMount() {
      this.fetchTopVideo();
  }

  fetchTopVideo() {
    let jprom = fetch('/records').then(res => {
      // console.log('res', res)
      return res.json()
    })
    jprom.then((data)=>{
      // console.log('fetch data', data)
    })
  }

  render() {
    const opts = {
      height: '360',
      width: '640'
    }
    return (
      <div>
        <h2 className="home-header mainHeader">weChallenge of the Day: {this.props.video.title}</h2>
        <div className="mainVideo-flexbox">
          <div className="mainVideo-container">
            <YouTube videoId={this.props.video.link}
              opts={opts}
            />
            <div className="user-wrapper">
              <UserPic user={this.props.video.UserId} username={this.props.video.User.username}/><span className="record-banner">&nbsp;in&nbsp;<strong>{this.props.video.Record.category}</strong></span>
            </div>
          </div>
          <VideoActions className="video-actions" title={this.props.video.title} subId={this.props.video.id} link={this.props.video.link} votes={this.props.video.votes} comments={this.props.video.comments} />
        </div>
      </div>
    )
  }

}
