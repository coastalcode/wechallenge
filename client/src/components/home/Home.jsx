import React from 'react';
import MainVideo from './MainVideo';
import VideoList from './VideoList';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      stateVideos: [],
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
      let videos = data.sort((a,b)=> b.votes > a.votes)
      let stateVideos = videos.filter(val=>val.state === localStorage.region).slice(0, 7)
      this.setState({videos: videos.slice(0,7)});
      this.setState({stateVideos: stateVideos})
      this.setState({mainvideo: videos[0]})
    })
  }

  render() {
    return (
      <div>
        { this.state.mainvideo ?
          <MainVideo video={this.state.mainvideo}/>
          : null
        }
        { this.state.videos.length > 0 ?
          <div className="videolists-container">
            <VideoList videos={this.state.stateVideos} locale={'state'}/>
            <VideoList videos={this.state.videos} locale={'global'}/>
          </div>
        : null
        }
      </div>
    )
  }
}