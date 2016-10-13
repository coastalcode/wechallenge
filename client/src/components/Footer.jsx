import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let path = `/about`
    return (
      <div className="page-footer">
        <center>
          <Link to={ path }> CoastalCode 2016. </Link>
        </center>
      </div>
    )
  }
}