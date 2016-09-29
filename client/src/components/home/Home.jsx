import React from 'react';
import MainVideo from './MainVideo';
import VideoList from './VideoList';
console.log('home')

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      mainvideo: null
    }
  }

  componentWillMount() {
    this.fetchVideos();
  }

  fetchVideos() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    let promise = fetch('/submissions').then(res=>res.json())
    promise.then((data)=>{
      console.log('submissions', data)
      this.setState({videos: data});
      this.setState({mainvideo: data[data.length - 1]})
    })
  }

  render() {
    let testVideo = {
      videoID: 'l6Zs_l7TOhg',
      title: 'Oranges?!',
      comments: 23,
      points: 99
    }
    let testVideoArray = new Array(5).fill(testVideo)
    return (
      <div>
        { this.state.mainvideo ?
          <MainVideo video={this.state.mainvideo}/>
          : null
        }
        { this.state.videos.length > 0 ?
          <div className="videolists-container">
            <div className="videolists-flexbuffer"></div>
            <VideoList videos={this.state.videos} locale={'state'}/>
            <VideoList videos={this.state.videos} locale={'global'}/>
            <div className="videolists-flexbuffer"></div>
          </div>
        : null
        }
      </div>
    )
  }
}