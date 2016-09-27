import React, { Component } from 'react';
import NavBar from './NavBar';
import Home from './home/Home';

export default class App extends Component {
  constructor(props) {
    super(props)
    console.log('App', this.props)
  }
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
        { this.props.location.pathname === '/' ?
          <Home />
          :
          null }
      </div>
    )
  }
}