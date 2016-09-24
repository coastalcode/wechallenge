import React from 'react';
import MainVideo from './MainVideo';
import VideoList from './VideoList';
console.log('home')
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Staff Pick:</h1>
          <MainVideo />
        </div>
        <div>
        </div>
      </div>
    )
  }
}