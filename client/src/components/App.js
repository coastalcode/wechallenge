import React, { Component } from 'react';
import NavBar from './NavBar';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
        <h1>Smalley Empire</h1>
      </div>
    )
  }
}