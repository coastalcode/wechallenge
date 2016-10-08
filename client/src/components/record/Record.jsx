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
    fetch(`/users/${ localStorage.getItem('user') }`)
      .then((currentUser)=> currentUser.json())
      .then((currentUser)=>{
        this.setState({ currentUser });
    })
  }

  fetchRecordInfo() {
    fetch(`/records/${ this.props.location.query.id }`)
      .then((recordInfo)=> recordInfo.json())
      .then((recordInfo)=>{
        this.setState({ recordInfo });
        console.log(recordInfo)
    })
  }

  fetchVideos() {
    let that = this;
    let toggle = this.props.toggle

    fetch(`/submissions/${ this.props.location.query.id }`)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        return submissions;
      })
      .then((submissions)=> {
        that.sortSubmissions();
      })
  }

  sortSubmissions() {
    let more = this.state.recordInfo.moreisgood;
    let submissions = this.state.submissions.slice();

    submissions.sort((a, b) => {
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
    this.setState({ submissions })

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
          first={ this.state.submissions[0] }
          record={ this.state.recordInfo }
          toggle={ this.toggleChallengeShow.bind(this) }
          rid={ this.props.location.query.id } />
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