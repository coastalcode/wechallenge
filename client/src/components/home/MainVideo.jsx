import React from 'react';
import Video from './Video';
import YouTube from 'react-youtube';
import VideoActions from './VideoActions';

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
      height: '349',
      width: '560'
    }
    return (
      <div>
        <h1 className="home-header mainHeader">weChallenge of the Day: {this.props.video.title}</h1>
        <div className="video-container">
          <YouTube videoId={this.props.video.link}
            opts={opts}
          />
        </div>
        <VideoActions className="video-actions" subId={this.props.video.id} link={this.props.video.link} votes={this.props.video.votes} comments={this.props.video.comments} />
      </div>
    )
  }

}
