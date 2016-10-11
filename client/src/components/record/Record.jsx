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

  http://localhost:3000/record  ?id=3

{ rid: 2,
 cid : 3 }

  fetchRecordInfo() {
    fetch(`/records/${ this.props.location.query.rid }`)
      .then((recordInfo)=> recordInfo.json())
      .then((recordInfo)=>{
        this.setState({ recordInfo });
        console.log(recordInfo)
    })
  }

  fetchVideos() {
    let that = this;
    let toggle = this.props.toggle
    let fetchPath;

    if (this.props.location.query.cid) {
      fetchPath = `/submissions/community?rid=${ this.props.location.query.rid }&cid=${ this.props.location.query.cid }`
    } else {
      fetchPath = `/submissions/${ this.props.location.query.rid }`
    }

    fetch(fetchPath)
      .then((submissions)=> submissions.json())
      .then((submissions)=>{
        this.setState({ submissions });
        return submissions;
      })
      .then((submissions)=> {
        that.getDurations();
        return submissions;
      })
      .then((submissions)=> {
        console.log("durations!!!!", this.state.submissions)
        that.sortSubmissions();
      })
  }

  getDurations() {
    let submissions = this.state.submissions.slice();
    if (!submissions.length) { return submissions }

    let best = submissions[0].measurement;
    submissions[0].history = 1;
    let history = 2;
    let index = 0;

    for (var i = 0; i < submissions.length; i++) {
      if (submissions[i].measurement > best) {
        let prev = moment(submissions[index].createdAt)
        let updated = moment(submissions[i].createdAt)

        let duration = moment.duration(updated.diff(prev));
        let hours = duration.asHours();
        let days = duration.asDays();


        submissions[index].duration = (hours > 24) ?
          Math.floor(days) + " day(s)" : Math.floor(hours) + " hour(s)"
        submissions[i].history = history;
        history++;
        index = i;
        best = submissions[i].measurement;
      }
    }

    submissions[index].duration = "current winner!"
    this.setState({ submissions })
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

  getRecordHistory() {
    let submissions = this.state.submissions.slice();

    for (var i = 0; i < submissions.length; i++) {

    }
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
  let mainpage = `/record?rid=${ this.props.location.query.rid }`
  let that = this;

    return (
      <div className="indivrecord">
      <center>
      <button onClick={ event => this.toggleChallengeShow() }> Challenge! </button>
      <br/>

      { (this.state.challengeShow) ?
        <Challenge
          first={ this.state.submissions[0] }
          record={ this.state.recordInfo }
          toggle={ this.toggleChallengeShow.bind(this) }
          rid={ this.props.location.query.rid } />
          : null }

        <br/>
        { (this.props.location.query.cid) ? <Link to={ mainpage }>
          <button onClick={ event => window.location.reload() }>Check out the main page for this record!</button>
        </Link> : null }

        <SubmissionList
          cid={ this.props.location.query.cid }
          currentUser={ this.state.currentUser }
          submissions={ this.state.submissions }
          record={ this.state.recordInfo } />
      </center>
      </div>
    )
  }
}