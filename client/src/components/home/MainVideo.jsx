import React from 'react';
import Video from './Video';
import YouTube from 'react-youtube';

export default class MainVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [1,2,3]
    };
  }

  render() {
    const opts = {
      height: '349',
      width: '560'
    }
    return (
      <div className="video-container">
        <YouTube videoId={'l6Zs_l7TOhg'}
          opts={opts}
        />
      </div>
    )
  }

}