import React from 'react';

export default class RecordEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  adminRemoveVideo () {
    console.log(this.props.flag.id)
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/submissions/adminremove/${ this.props.flag.id }`)
      .then((removed)=>{
        console.log(this.props.flag.id)
        console.log("Bye!!")
    })
  }

  toggleFlagVideo () {
    console.log(this.props.flag.id)
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/submissions/flag/${ this.props.flag.id }`)
      .then((flagged)=>{
        console.log("You flagged a video! Nice!")
    })
  }

  render() {
    let url = `https://www.youtube.com/embed/${ this.props.flag.link }`
    return (
      <div>
        { this.props.flag.title }
        <br/>
        <iframe width="560" height="315" src={ url } frameBorder="0" allowFullScreen></iframe>
        <br />
        <button onClick={event=>{ this.adminRemoveVideo() }} >Remove this video</button>
        <button onClick={event=>{ this.toggleFlagVideo()  }} >Unflag this video</button>
      </div>
    )
  }
}