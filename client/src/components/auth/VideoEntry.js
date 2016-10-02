import React, { Component } from 'react';
import { Link } from 'react-router';

export default class VideoEntry extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let dateObj = new Date(this.props.data.createdAt)
    let path = `/record?id=${ this.props.data.RecordId }`
    return(
      <Link to={path}>
        <h3>{this.props.data.title}</h3>
        <p>Submitted: {dateObj.toLocaleString()}</p>
      </Link>
    )
  }
}