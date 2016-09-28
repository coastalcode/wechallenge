import React from 'react';
import RecordEntry from './RecordEntry';

export default class RecordList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("RecordList successfully mounted!")
  }

  render() {
    return (
      <div className="recordList">
        { this.props.videos.map((video) => <RecordEntry key={ video.key }video={ video }/>) }
        <br/>
      </div>
    )
  }
}