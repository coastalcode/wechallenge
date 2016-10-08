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

  storeImage(data) {
    fetch( '/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: data, user: localStorage.user, token: localStorage.token})
    }).then((res)=>{
      if (res.status === 200) {
        this.setState({userPic: data})
      }
    })
  }

  compressImage(bigdata) {
    let img = new Image();
    img.src = bigdata;

    img.onload = () => {
      let canvas = document.createElement('canvas');
      let width = 150;
      let height = Math.floor(img.height / (img.width / width));
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      let data = canvas.toDataURL('image/jpeg', 0.7);
      this.storeImage(data);
    }

  }

  handleImage(event) {
    let file = event.target.files[0],
    reader = new FileReader(),
    url = '/images';
    reader.readAsDataURL(file)

    reader.onload = (e) => {
      this.compressImage(e.target.result)
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
                   onChange={this.handleImage.bind(this)} />
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