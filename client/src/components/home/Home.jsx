import React from 'react';
import MainVideo from './MainVideo';
import VideoList from './VideoList';
console.log('home')
export default class Home extends React.Component {
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
        <MainVideo video={testVideo}/>
        <div className="videolists-container">
          <div className="videolists-flexbuffer"></div>
          <VideoList videos={testVideoArray} locale={'state'}/>
          <VideoList videos={testVideoArray} locale={'global'}/>
          <div className="videolists-flexbuffer"></div>
        </div>
      </div>
    )
  }
}