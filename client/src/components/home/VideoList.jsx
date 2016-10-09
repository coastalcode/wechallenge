import React from 'react';
import Video from './Video';
import YouTube from 'react-youtube';
import VideoActions from './VideoActions';
import { Link } from 'react-router';
import UserPic from './UserPic';

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
          <h1 className="home-header topLocal">Top Records In {localStorage.region}</h1>
          :
          <h1 className="home-header topGlobal">Top Records Worldwide</h1>
        }
        { this.props.videos.map((val,i)=>{
          console.log('videolistval', val)
          val.User = val.User || {username: 'Anonymous'}
          let thumbStyle = {
            width: '80%'
          }
          let path = `/record?id=${ val.RecordId }`
          return (
            <div className="youtube-flexbox" key={i}>
                <Link className="youtube-container" to={ path }>
                <div className="youtube-thumbnail" style={{ backgroundImage: 'url(http://img.youtube.com/vi/' + val.link + '/hqdefault.jpg)'}}></div>
                </Link>
                <div className="youtube-deets">
                  <span className="title-banner">{val.title}</span>
                  <UserPic user={val.UserId} username={val.User.username}/>
                </div>
            </div>
          )
        })}
      </div>
    )
  }
}