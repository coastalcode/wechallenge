import React from 'react';
import VideoList from './VideoList';

export default class MainVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <VideoList type='local'/>
      </div>
    )

  }

}