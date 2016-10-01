import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../../actions';
import UserInfo from './userInfo';
import VideoEntry from './VideoEntry';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userComments: [],
      userVideos: []
    }
  }

  componentWillMount() {
    this.fetchCurrentUser();
    this.fetchUserComments();
  }

  fetchUserVideos() {

  }

  fetchUserComments() {
    console.log('localStorage', localStorage.user)
    fetch('/comments/user/' + localStorage.user)
      .then((res)=>res.json())
      .then((data)=>{
        this.setState({userComments: data})
        console.log('findcomments', data)
      })
  }

  fetchCurrentUser() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }
    console.log(localStorage.user)

    fetch(`/users/${ localStorage.getItem('user') }`)
      .then((currentUser)=> currentUser.json())
      .then((currentUser)=>{
        console.log('user: ', currentUser)
      this.setState({ currentUser: currentUser });
    })
  }

  render() {
    return (
      <div>
      <h1>Hello! {this.state.currentUser.username}</h1>

      </div>
      )
  }
}