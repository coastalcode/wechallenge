import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from './home/Home';

export default class App extends Component {
  constructor(props) {
    super(props)
    console.log('App', this.props)
    this.findRegion();
  }

  // Finds the state that the user's IP address is coming from
  findRegion(ip) {
    fetch('https://ipapi.co/json/').then(res=> res.json())
      .then(data=> localStorage.setItem('region', data.region))
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
        <Footer />
      </div>
    )
  }
}