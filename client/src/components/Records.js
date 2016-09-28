import React, { Component } from 'react';
import { browserHistory } from 'react-router';
export default class Records extends Component {
  constructor(props) {
    super(props)

    // will be fed in later, this is just for testing purposes

    // will need "current recordId" on the state, then map over all the videos with that recordId.

    this.testing = {
      id: 0,
      title: "Best Video in the world",
      link: "https://www.youtube.com/embed/a1Y73sPHKxw",
      description: "This is the best video in the world",
      votes: 0,
      official: 1,
      createdAt: "a minute ago",
      updatedAt: "Never!",
      UserId: 0,
      RecordId: 0
    }
  }

  render() {
    return (
      <center>
      <div>
        <h3>{ this.testing.title} </h3>
        <iframe width="560" height="315" src={ this.testing.link } frameborder="0" allowfullscreen></iframe>
        <div>
          { this.testing.description }
          <br/>
          upvotes: { this.testing.votes }
          <br/>
          This video was uploaded { this.testing.createdAt } by user { this.testing.UserId }
          <br/>
          <button onClick="">Challenge this record!</button>
        </div>
      </div>
      </center>
    )
  }
}