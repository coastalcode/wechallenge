import React from 'react';
import CCommentList from './CCommentList';
import CSubmissionList from './CSubmissionList';

export default class CRecord extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recordInfo: {},
      submissions: [],
      currentUser: "",

      first: {},
      other: []
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

    fetch(`/submissions/${ this.props.location.query.id }`)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        console.log(submissions)
        return submissions})
      .then((submissions)=> sortFunction())
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
    console.log(this.props)
    console.log("records:", this.state.recordInfo)
    console.log("submissions:", this.state.submissions)
    return (
      <div>
      <center>
        <CSubmissionList
          currentUser={ this.state.currentUser }
          submissions={ this.state.submissions }
          record={ this.state.recordInfo } />
      </center>
      </div>
    )
  }
}