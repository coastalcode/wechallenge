import React from 'react';
import FlaggedVideoList from './FlaggedVideoList';

export default class FlaggedVideos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flagged : []
    }
  }

  fetchFlaggedVideos() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch('/submissions/flagged')
      .then((flagged)=>flagged.json())
      .then((flagged)=>{
        console.log(flagged)
        this.setState({ flagged });
    })
  }

  componentDidMount() {
    this.fetchFlaggedVideos();
  }

  render() {
    return (<FlaggedVideoList flagged={ this.state.flagged }/>)
  }
}