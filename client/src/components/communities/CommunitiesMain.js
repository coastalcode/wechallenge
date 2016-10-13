import React, { Component } from 'react';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';
import * as actions from '../../actions';

import CreateCommunity from './CreateCommunity';
import Nav from './Nav';
import List from './ListofC';
import CommunityPage from '../community/CommunityPage';
import SearchBar from './SearchBar';


export default class Communities extends Component {
  constructor(props) {
    super(props);

    this.state={};
    this.state.showModal = false;
    this.state.communities = [];

    this.state.reload = false;
    this.state.community = {};

    this.state.allcommunities = [];
    this.state.yours = true;
    this.state.all = false;
    this.state.showJoin = false;
    this.state.showJoined= false;
    this.state.showPage = 1;
    this.state.search = "";
  }

  updateSearchTerm(search) {
    this.setState({ search })
  }

  checkForMatching(checkThese, forThis) {
    let bool = false;
    if (forThis === "") {
      return true;
    }

    checkThese.forEach((item)=>{
      if (item && item.toLowerCase().indexOf(forThis.toLowerCase()) > -1) {
        bool = true;
      }
    })

    return bool;
  }

  showYou() {
    this.setState({ yours: true });
    this.setState({ all: false});
  }

  showAll() {
    this.setState({ all: true});
    this.setState({ yours: false });
    this.setState({ reload : false});
  }

  openPage () {
    this.setState({ showPage : this.state.showPage + 1 });
  }

  closePage () {
    this.setState({ showPage: false });
  }

  openJoin() {
    this.setState({ showJoin: true });
  }

  closeJoin() {
    this.setState({ showJoin: false });
  }

  openJoined() {
    this.setState({ showJoined: true });
  }

  closeJoined() {
    this.setState({ showJoined: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  //******************FOR ANNA************** THANK YOU HARRIS
  openCommunity(id) {
    this.openPage();
    const communityID = id
    console.log("____ID", communityID)
    fetch(`/community/${communityID}`)
      .then((community) => community.json())
      .then((community) =>{
        this.setState({community: community[0]});
        return community
      })
      .then((community) => {
        this.setState({ reload: false });
        return community
      })
      .then(community=> {
        this.setState({ reload : true });
        return community
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

  componentDidMount() {
    this.fetchCommunities();
    this.fetchAllCommunities();
  }

  render() {
    return (
      <div>
      <header className="business-header">
        <h1 className="tagline">Challenge Your Community</h1>
      </header>

      <nav className="navbar navbar-inverse">
        <div className="container-fluid" id="myNavbar">
          <ul className="nav navbar-nav">
            <li className="profile-navbar">
              <a className="navbar-brand" onClick={this.openModal.bind(this)}>Create</a>
            </li>
            <li>
              <a className="navbar-brand">||</a>
            </li>
            <li className="profile-navbar">
              <a className="navbar-brand" onClick={this.showAll.bind(this)}>Discover</a>
            </li>
            <li>
              <a className="navbar-brand">||</a>
            </li>
            <li>
               <a className="navbar-brand" onClick={this.showYou.bind(this)}>My Communities</a>
            </li>
          </ul>
        </div>
      </nav>

      {this.state.yours ? <Nav
        communities={this.state.communities}
        open={this.openCommunity.bind(this)}
        /> : null }

      {this.state.all ?
        <div>
          <SearchBar updateSearchTerm={ this.updateSearchTerm.bind(this) }/>
          <List
            data={this.state.communities}
            all={this.state.allcommunities}
            openJoin={this.openJoin.bind(this)}
            search={this.state.search}
            openJoined={this.openJoined.bind(this)}
            checkForMatching={this.checkForMatching}/>
        </div> : null}

      <div>
      { (this.state.reload) ? (<CommunityPage className="community-box" community={this.state.community} />) : null }
      </div>

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