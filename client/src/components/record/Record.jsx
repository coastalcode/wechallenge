import React from 'react';
import CommentList from './CommentList';
import SubmissionList from './SubmissionList';
import Challenge from '../challenge/Challenge'
import { Link } from 'react-router';

export default class Record extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recordInfo: {},
      submissions: [],
      currentUser: "",

      first: {},
      other: [],

      challengeShow: false
    }
  }

  fetchCurrentUser() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/users/${ localStorage.getItem('user') }`)
      .then((currentUser)=> currentUser.json())
      .then((currentUser)=>{
        this.setState({ currentUser });
    })
  }

  fetchRecordInfo() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/records/${ this.props.location.query.id }`)
      .then((recordInfo)=> recordInfo.json())
      .then((recordInfo)=>{
        this.setState({ recordInfo });
        console.log(recordInfo)
    })
  }

  fetchVideos() {
    let sortFunction = this.sortSubmissions.bind(this)
    let toggle = this.props.toggle

    fetch(`/submissions/${ this.props.location.query.id }`)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        console.log(submissions)
        return submissions})
      .then((submissions)=> {
        sortFunction();
      })
  }

  sortSubmissions() {
    let more = this.state.recordInfo.moreisgood
    this.state.submissions.sort(function (a, b) {
      if (more) {
        if (a.measurement > b.measurement) {
          return -1
        } else {
          return 1
        }
      } else {
        if (a.measurement > b.measurement) {
          return 1
        } else {
          return -1
        }
      }
    })
  }

  toggleChallengeShow() {
    this.setState({ challengeShow: !this.state.challengeShow })
  }

  componentDidMount() {
    this.fetchRecordInfo();
    this.fetchVideos();
    this.fetchCurrentUser();
  }

  render() {
    return (
      <div>
      <center>
      <button onClick={ event => this.toggleChallengeShow() }> Challenge! </button>
      <br/>

      { (this.state.challengeShow) ?
        <Challenge
          toggle={ this.toggleChallengeShow.bind(this) }
          rid={ this.props.location.query.id  } />
          : null }

        <br/>
        <SubmissionList
          currentUser={ this.state.currentUser }
          submissions={ this.state.submissions }
          record={ this.state.recordInfo } />
      </center>
      </div>
    )
  }
}