import React from 'react';
import { Link } from 'react-router';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("RecordEntry successfully mounted!")
  }

  render() {
    let path = `/record?id=${ this.props.video.RecordId }`
    return (
      <div className="recordList-entry">
        { this.props.video.title }
        <br/>
        <Link to={ path }>
          <img className="videolist-thumb"
            src={ "http://img.youtube.com/vi/" + this.props.video.link + "/hqdefault.jpg" }
            onClick={(event)=>{console.log(event)}} />
        </Link>
      </div>
    )
  }
}