import React from 'react';
import Video from './Video';

export default class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {videos: [1,2,3,4,5]}
  }
  componentDidMount() {
    console.log('grab list of videos from', this.props)
  }

  render() {

    return (
      <div>
        { this.state.videos.map((val)=>{
          return <Video content={val} />
        })}
      </div>
    )
  }
}