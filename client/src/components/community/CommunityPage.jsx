import React from 'react';
import BulletinList from './BulletinList';
import Records from './../records/Records';
import { Link } from 'react-router';

export default class CommunityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { cid : this.props.community.id };
  }

  render2() {
    return (
      <div>
      <div className="community-header">{this.props.community.name}</div>
      <p className="community-description">{this.props.community.description}</p>
        <Records cid={ this.state.cid }/>
      </div>
    )
  }
  render() {
    return (<div className="community-box">

    { this.render2() }

    </div>)
  }
}

// <BulletinList cid={ this.state.cid }/>