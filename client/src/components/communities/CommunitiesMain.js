import React, { Component } from 'react';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

import CreateCommunity from './CreateCommunity';
import Nav from './Nav';
import CRecords from '../community/records/CRecords';

export default class Communities extends Component {
  constructor(props) {
    super(props);

    this.state={};
    this.state.showModal = false;
    this.state.communities = [];
    this.state.community = [];
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }
  //******************FOR ANNA**************
  openCommunity(id) {
    const communityID = id
    console.log("____ID", communityID)
    fetch(`/community?id=${communityID}`)
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
        console.log('data communities________', communities)
      })
  }

  componentWillMount() {
    this.fetchCommunities();
  }

  render() {
    return (
      <div>
      <h1>hello welcome to communities page</h1>
      <Nav
        communities={this.state.communities}
        submit={this.openModal.bind(this)}
        open={this.openCommunity.bind(this)}
        />
      <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
            <Modal.Title>Create Your Own Community</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCommunity close={this.closeModal.bind(this)} />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <button onClick={this.openModal.bind(this)}>Create One</button>
      <CRecords data={this.state.community}/>
      </div>
      )
  }

}