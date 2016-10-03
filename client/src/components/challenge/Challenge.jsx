import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import { browserHistory } from 'react-router';

export default class Challenges extends React.Component {
  constructor(props) {
    super(props);

    this.userId = localStorage.getItem('user') || 0;

    this.state = {
      submission: {
          title: "",
          link: "",
          description: "",
          votes: 0,
          official: 1,
          UserId: this.userId,
          RecordId: window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1),
          measurement: 0
      }
    }
  }

  getRecordId() {
    let last = window.location.pathname.lastIndexOf("/") + 1
    let recordId = window.location.pathname.slice(window.location.pathname.lastIndexOf("/") + 1)

  }

  getVideoId(url) {
    let last = url.lastIndexOf("=") + 1
    return url.slice(last)
  }

  addSubmission(submission) {
    return fetch('/submissions/', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(submission)
    }).then(function(response) {
        console.log(response);
    })
  }

  render() {
    let retrieve = this.getVideoId
    return (
      <div>
      Title:
      <br/>
      <input onChange={ event => this.setState({ title: event.target.value }) } />
      <br/>
      <input onChange={ event => this.setState({ description: event.target.value }) } />
      <br/>
      <br/>
      Use Link:
      <br/>
      <input onChange={ event => this.setState({ link: retrieve(event.target.value) }) } />
      <br/>
      <button onClick={ event => this.addSubmission(this.state.submission)} >Upload!!</button>
      </div>
    )
  }
}