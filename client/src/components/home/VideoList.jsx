import React from 'react';
import Video from './Video';
import YouTube from 'react-youtube';

export default class VideoList extends React.Component {
  constructor(props) {
    super(props);
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
        { this.props.locale === 'state' ?
          <h1 className="home-header topLocal">Top Records In Your Area</h1>
          :
          <h1 className="home-header topGlobal">Top Records Worldwide</h1>
        }
        { this.props.videos.map((val)=>{
          return (
            <div className="youtube-container">
              <span className="title-banner">{val.title}</span>
              <img src={"http://img.youtube.com/vi/" + val.videoID + "/hqdefault.jpg"}/>
            </div>
          )
        })}
      </div>
    )
  }
}