import React from 'react';
import Video from './Video';
import YouTube from 'react-youtube';
import VideoActions from './VideoActions';

export default class MainVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.fetchTopVideo();
  }

  fetchTopVideo() {
    let headers = new Headers();
    let init = {
      method: 'GET',
      headers: headers
    }
    let jprom = fetch('/records', init).then(res => res.json())
    jprom.then((data)=>{
      console.log('data', data)
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
          <YouTube videoId={this.props.video.videoID}
            opts={opts}
          />
        </div>
        <VideoActions points={this.props.video.points} comments={this.props.video.comments} />
      </div>
    )
  }

}