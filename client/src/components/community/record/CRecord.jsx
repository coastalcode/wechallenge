import React from 'react';
import CCommentList from './CCommentList';
import CSubmissionList from './CSubmissionList';
import Challenge from '../../challenge/Challenge'
import { Link } from 'react-router';

export default class CRecord extends React.Component {
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

    fetch(`/records/${ this.props.location.query.rid }`)
      .then((recordInfo)=> recordInfo.json())
      .then((recordInfo)=>{
        this.setState({ recordInfo });
        console.log(recordInfo)
    })
  }

  fetchVideos() {
    let sortFunction = this.sortSubmissions.bind(this)

    fetch(`/submissions/community?rid=${ this.props.location.query.rid }&cid=${ this.props.location.query.cid }`)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        console.log(submissions)
        return submissions})
      .then((submissions)=> sortFunction())
  }

  toggleChallengeShow() {
    this.setState({ challengeShow: !this.state.challengeShow })
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


  componentDidMount() {
    this.fetchRecordInfo();
    this.fetchVideos();
    this.fetchCurrentUser();
  }

  render() {
    let mainpage = `/record?id=${ this.props.location.query.rid }`
    let challenge = `/challenge/${ this.state.recordInfo.id }`

    return (
      <div>
      <center>
      <button onClick={ event => this.toggleChallengeShow() }> Challenge! </button>
      <br/>

      { (this.state.challengeShow) ?
        <Challenge
          toggle={ this.toggleChallengeShow.bind(this) }
          rid={ this.props.location.query.rid  }
          cid={ this.props.location.query.cid } />
          : null }

      <Link to={ mainpage }>
      <button>Check out the main page for this record!</button>
      </Link>

        <CSubmissionList
          currentUser={ this.state.currentUser }
          submissions={ this.state.submissions }
          record={ this.state.recordInfo }
          cid={ this.props.location.query.cid } />
      </center>
      </div>
    )
  }
}