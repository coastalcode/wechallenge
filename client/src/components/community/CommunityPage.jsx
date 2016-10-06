import React from 'react';
import BulletinList from './bulletin/BulletinList';
import CRecords from './records/CRecords';
import { Link } from 'react-router';

export default class CommunityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { cid : this.props.community[0].id };
  }

  render2() {
    return (
      <div>
        <BulletinList cid={ this.state.cid }/>
        <CRecords cid={ this.state.cid }/>
      </div>
    )
  }
  render() {
    console.log("props for community page", this.props);
    return (<div>

    { this.render2() }

    </div>)
  }
}