import React, { Component } from 'react';
import NavBar from './NavBar';
import Home from './home/Home';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
        <h1>Smalley Empire</h1>
        <Home />
      </div>
    )
  }
}