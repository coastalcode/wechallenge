import React from 'react';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("RecordEntry successfully mounted!")
  }

  render() {
    return (
      <div>
        { this.props.video.name }
        <br/>
        <img className="videolist-thumb"
          src={ "http://img.youtube.com/vi/" + this.props.video.id + "/hqdefault.jpg" }
          onClick={(event)=>{console.log(event)}} />

      </div>
    )
  }
}