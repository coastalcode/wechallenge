// import React, { Component } from 'react';
// import axios from 'axios';
// import * as actions from '../../actions';
// import UserInfo from './userInfo';
// import VideoEntry from './VideoEntry';

// export default class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUser: ''
//     }
//   }

//   componentWillMount() {
//     this.fetchCurrentUser();
//   }

//   fetchCurrentUser() {
//     let init = {
//       method: 'GET',
//       headers: new Headers()
//     }

//     fetch(`/users/${ localStorage.getItem('user') }`)
//       .then((currentUser)=> currentUser.json())
//       .then((currentUser)=>{
//         console.log('user: ', currentUser)
//       this.setState({ currentUser: currentUser });
//     })
//   }

//   render() {
//     return (
//       <div>
//       <h1>Hello! {this.state.currentUser.username}</h1>
//       <UserInfo data={this.tate.currentUser}/>
//       <VideoEntry />

//       </div>
//       )
//   }
// }