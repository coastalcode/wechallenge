import React from 'react';
import BulletinList from './BulletinList';
import Records from './../records/Records';
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
        <Records cid={ this.state.cid }/>
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