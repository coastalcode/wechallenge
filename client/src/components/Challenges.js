import React, { Component } from 'react';

  // is this page to see your challenges?

export default class Challenges extends Component {
  constructor(props) {
    super(props)

    this.received = [];
    this.sent = [];
  }


  render() {

    return (
      <div>
        <div>Current challenges!</div>

        Received:


        Sent:

      </div>
    )
  }
}
