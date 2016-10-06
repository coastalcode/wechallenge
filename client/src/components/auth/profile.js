import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../../actions';
import UserInfo from './userInfo';
import CommentList from './CommentList';
import VideoList from './VideoList';
import FileInput from 'react-file-input'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userComments: [],
      userSubs: [],
      userPic: null
    }
  }

  componentWillMount() {
    this.fetchCurrentUser();
    this.fetchUserComments();
    this.fetchUserSubs();
  }

  componentDidMount() {
      this.fetchUserPic();
  }

  fetchUserPic() {
    fetch('/images/' + localStorage.user)
      .then((res)=> res.json())
      .then((image)=> {
        console.log('here be da data', image)
        this.setState({ userPic: image.json })
      })
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

  handleImage(event) {
    let file = event.target.files[0],
    reader = new FileReader(),
    url = '/images';

    let data = reader.readAsDataURL(file)

    reader.onload = (e) => {
      console.log('form', e.target)
      fetch( url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: e.target.result, id: localStorage.user, token: localStorage.token})
      }).then((res)=>{
        console.log('hi', res)
      })
    }

  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.currentUser.username}!</h1>
        { this.state.userPic ? <img className="profile--userPic" src={this.state.userPic}/> : null}
        <form>
          <label htmlFor="profile-img-input">Upload a profile picture</label>
             <FileInput name="myImage"
                   accept=".png,.gif,.jpg,.jpeg"
                   placeholder="My Image"
                   className="inputClass"
                   onChange={this.handleImage} />
        </form>
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