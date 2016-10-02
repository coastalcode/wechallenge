import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../../actions';
import UserInfo from './userInfo';
import CommentList from './CommentList';
import VideoList from './VideoList';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userComments: [],
      userSubs: []
    }
  }

  componentWillMount() {
    this.fetchCurrentUser();
    this.fetchUserComments();
    this.fetchUserSubs();
  }

  fetchUserSubs() {
    fetch('/usersub/' + localStorage.user)
      .then((res)=>res.json())
      .then((data)=>{
        console.log('find subs', data)
        this.setState({userSubs: data})
      })
  }

  fetchUserComments() {
    fetch('/comments/user/' + localStorage.user)
      .then((res)=>res.json())
      .then((data)=>{
        this.setState({userComments: data})
      })
  }

  fetchCurrentUser() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

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
        <h1>Hello, {this.state.currentUser.username}!</h1>
        { this.state.userComments.length > 0 ?
          <CommentList data={this.state.userComments} />
          : null
        }
        { this.state.userSubs.length > 0 ?
          <VideoList data={this.state.userSubs} />
          : null
        }
      </div>
      )
  }
}