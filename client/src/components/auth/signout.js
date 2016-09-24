//maybe we can display videos to show up in signout page
//to keep users in rabbithole
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Good bye</div>
  }
}

export default connect(null,actions)(Signout)