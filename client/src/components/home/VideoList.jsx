import React from 'react';
import Video from './Video';
import YouTube from 'react-youtube';
import VideoActions from './VideoActions';
import { Link } from 'react-router';

export default class VideoList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('VideoList loaded')
  }

  render() {
    const opts = {
      height: '200',
      width: '400'
    }

    return (
      <div className="videolist-columns">
        { this.props.locale === 'state' ?
          <h1 className="home-header topLocal">Top Records In Your Area</h1>
          :
          <h1 className="home-header topGlobal">Top Records Worldwide</h1>
        }
        { this.props.videos.map((val,i)=>{
          console.log('videolistval', val)
          let thumbStyle = {
            width: '80%'
          }
          let path = `/record?id=${ val.RecordId }`
          return (
            <div key={i}>

                <Link className="youtube-container" to={ path }>
                <span className="title-banner">{val.title}</span>
                <img style={thumbStyle} className="videolist-thumb" src={ "http://img.youtube.com/vi/" + val.link + "/hqdefault.jpg" }/>
                </Link>
              <VideoActions subId={val.id} points={val.points} comments={val.comments} />
            </div>
          )
        })}
      </div>
    )
  }
}