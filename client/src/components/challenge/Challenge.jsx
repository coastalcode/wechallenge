import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import { browserHistory } from 'react-router';

export default class Challenges extends React.Component {
  constructor(props) {
    super(props);

    this.userId = localStorage.getItem('user') || 0;
    this.region = localStorage.getItem('region');

    this.state = {
      submission: {
          title: "",
          link: "",
          description: "",
          public: 0,
          state: this.region,
          userId: this.userId,
          recordId: this.props.rid,
          measurement: 0
      }
    }
  }

  getVideoId(url) {
    let last = url.lastIndexOf("=") + 1
    return url.slice(last)
  }

  addSubmission(submission) {
    let toggle = this.props.toggle
    return fetch('/submissions/challenge', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(submission)
    }).then(function(response) {
        toggle();
        console.log(response);
    })
  }

  changeSubmissionProperties(property, propertyName) {
    let submission = this.state.submission;
    submission[propertyName] = property;
    this.setState({ submission });
  }

  render() {
    let retrieve = this.getVideoId
    console.log(this.props.rid, "record info????")
    return (
      <div>
      This is the current record: { this.props.first.measurement } { this.props.record.units }
      <br/>

      Title:
      <br/>
      <input onChange={ event => this.changeSubmissionProperties(event.target.value, 'title') } />
      <br/>

      Video description:
      <br/>
      <input onChange={ event => this.changeSubmissionProperties(event.target.value, 'description') } />
      <br/>

      Measurement:
      <br/>
      <input onChange={ event => this.changeSubmissionProperties(event.target.value, 'measurement') } />
      <br/>

      <form onChange={ event => this.changeSubmissionProperties(event.target.value, 'public') }>
        <input type="radio" value='0'/> Show in communities only
        <br/>
        <input type="radio" value='1'/> Show on global page
        <br/>
      </form>
      <br/>
      Use Link:
      <br/>
      <input onChange={ event => this.changeSubmissionProperties(retrieve(event.target.value), 'link') } />
      <br/>
      <button onClick={ event => this.addSubmission(this.state.submission)} >Upload!!</button>
      </div>
    )
  }
}