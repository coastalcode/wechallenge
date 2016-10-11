import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid" id="myNavbar">
          <ul className="nav navbar-nav">
            <li className="profile-navbar">
              <a
                className="navbar-brand"
                onClick={this.props.changeProfileView.bind(null, 'submissions')}
              >Submissions</a>
            </li>
            <li>
              <a
                className="navbar-brand"
                onClick={this.props.changeProfileView.bind(null, 'votes')}
              >Videos Voted For </a>
            </li>
            <li>
              <a
                className="navbar-brand"
                onClick={this.props.changeProfileView.bind(null, 'comments')}
              >Comment History</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}