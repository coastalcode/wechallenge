import React from 'react';
import BulletinList from './bulletin/BulletinList';
import CRecords from './records/CRecords';
import { Link } from 'react-router';

export default class CommunityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <BulletinList cid={ this.props.location.query.cid }/>
        <CRecords cid={ this.props.location.query.cid }/>
      </div>
    )
  }
}