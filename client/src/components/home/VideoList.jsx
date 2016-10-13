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
        <div className="videoList-header">
          { this.props.locale === 'state' ?
            <h3 className="home-header topLocal">Top Records In {localStorage.region}</h3>
            :
            <h3 className="home-header topGlobal">Top Records Worldwide</h3>
          }
        </div>
        <div className="videolist-thumbnailRow">
          { this.props.videos.map((val,i)=>{
            console.log('videolistval', val)
            val.User = val.User || {username: 'Anonymous'}
            let path = `/record?rid=${ val.RecordId }`
            return (
              <div className="youtube-flexbox" key={i}>
                  <Link className="youtube-container" to={ path }>
                  <div className="youtube-thumbnail" style={{ backgroundImage: 'url(http://img.youtube.com/vi/' + val.link + '/hqdefault.jpg)'}}></div>
                  </Link>
                  <div className="youtube-deets">
                    <span className="title-banner">
                      { val.title.length > 45 ? val.title.slice(0,45) + '...' : val.title }
                    </span>
                    <div className="user-wrapper">
                      <UserPic user={val.UserId} username={val.User.username}/>
                      <span className="record-banner">&nbsp;in&nbsp;<strong>{val.Record.category}</strong></span>
                    </div>
                  </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
