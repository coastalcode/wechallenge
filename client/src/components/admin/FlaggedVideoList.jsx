import React from 'react';
import FlaggedVideoEntry from './FlaggedVideoEntry';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    console.log('flagged videos: ', this.props.flagged);
    return (
      <div>
        { this.props.flagged.map((flag) => <FlaggedVideoEntry key={ flag.id }flag={ flag }/>) }
      </div>
    )
  }
}