import React, { Component } from 'react';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

import CreateCommunity from './CreateCommunity';
import Nav from './Nav';
import List from './ListofC';
import CommunityPage from '../community/CommunityPage';

export default class Communities extends Component {
  constructor(props) {
    super(props);

    this.state={};
    this.state.showModal = false;
    this.state.communities = [];
    this.state.community = {};
    this.state.allcommunities = [];
    this.state.yours = true;
    this.state.all = false;
    this.state.showModal1 = false;
  }

  showYou() {
    this.setState({ yours: true });
    this.setState({ all: false});
  }

  showAll() {
    this.setState({ all: true});
    this.setState({ yours: false });
  }

  openModal1 () {
    this.setState({ showModal1: true });
  }

  closeModal1() {
    this.setState({ showModal1: false });
  }
  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }
  //******************FOR ANNA************** THANK YOU HARRIS
  openCommunity(id) {
    this.openModal1();
    const communityID = id
    console.log("____ID", communityID)
    fetch(`/community/${communityID}`)
      .then((community) => community.json())
      .then((community) =>{
        this.setState({community})
      })
      .catch((error) => {
        console.log(error);
      })
  }
  //*****Stored to state.community AND passed down to CRecords*****
  fetchCommunities() {
    const userID = localStorage.getItem('user');
    fetch(`/communities/${userID}`)
      .then((communities)=> communities.json())
      .then((communities)=>{
        this.setState({communities});
      })
  }

  fetchAllCommunities() {
    fetch('/communitiesall')
      .then((communities) => communities.json())
      .then((communities) => {
        this.setState({allcommunities: communities})
      })
      .catch((error) => {
        console.log(error);
      })
  }
  componentWillMount() {
    this.fetchCommunities();
    this.fetchAllCommunities();
  }

  render() {

    return (
      <div>
      <header className="business-header">
        <h1 className="tagline">Challenge Your Community</h1>
      </header>
      <div className="bar">
      <ul className="create">
      <li onClick={this.openModal.bind(this)}>Create Community</li>
      </ul>
      <ul className="communities">
      <li className="discover" onClick={this.showAll.bind(this)}>Discover</li>
      <li className="yours" onClick={this.showYou.bind(this)}>Communities</li>
      </ul>
      </div>
      {this.state.yours ? <Nav
        communities={this.state.communities}
        open={this.openCommunity.bind(this)}
        /> : null }

      {this.state.all ? <List data={this.state.communities} all={this.state.allcommunities} /> : null}

      <Modal show={this.state.showModal1} onHide={this.closeModal1.bind(this)}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          { (this.state.community[0]) ? (<CommunityPage community={this.state.community} />) : null }
        </Modal.Body>
      </Modal>

      <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <CreateCommunity close={this.closeModal.bind(this)} />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
      )
  }

}