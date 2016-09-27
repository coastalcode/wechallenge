import React from 'react';

export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = {video: props.content}
  }

  render() {
    return(
      <div>Video goes here</div>
    )
  }
}