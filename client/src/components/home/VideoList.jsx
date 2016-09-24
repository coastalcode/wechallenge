import React from 'react';
import Video from './Video';
import YouTube from 'react-youtube';

export default class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {videos: [1,2,3,4,5]}
  }
  componentDidMount() {
    console.log('grab list of videos from', this.props)
  }

  render() {
    const opts = {
      height: '200',
      width: '400'
    }
    return (
      <div>
        { this.state.videos.map((val)=>{
          return (
            <div>
              <YouTube videoId={'l6Zs_l7TOhg'}
                opts={opts}
              />
              <Video key={val} content={val} />
            </div>
          )
        })}
      </div>
    )
  }
}