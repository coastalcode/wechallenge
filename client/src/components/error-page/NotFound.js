import React, { Component } from 'react';
import About from './../About';

export default class NotFound extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="notFound">
      <center>
        <h1>Oh no! The page you are looking for is not found.</h1>

        <br/>
        While you're here, check out the team behind the app!

        <About/>


      </center>
      </div>
    )
  }
}