import React from 'react';

export default class Voting extends React.Component {
  constructor(props) {
    super(props);
    console.log('voting stored', this.props)
    this.state = {
      canVote: false,
      showSignin: false,
      voted: false
    };
  }

  componentDidMount() {
      if (localStorage.token) {
        this.setState({canVote: true});
        // search for existing vote
        this.checkVote(this.props.subId, localStorage.user)
      }
  }

  checkVote(subId, userId) {
    let init = {
      method: 'GET',
      headers: new Headers()
    }
    let promise = fetch('/votes').then(res=>res.json());
    promise.then((data)=>{
      data = data.filter((el)=>{
        return el.UserId == localStorage.user && el.SubmissionId == subId
      })
      if (data.length > 0) {
        this.setState({voted: true})
      }
      console.log('filtered', data)
    })
  }

  recordVote(subId, userId) {
    let init = {
      method: 'POST',
      headers: new Headers(),
      body: JSON.stringify({submissionId: subId, userId: userId, token: localStorage.token})
    }
    fetch('/votes', init).then((res)=>{
      // console.log(res)
      this.setState({voted: true})
    })
  }

  addVote() {
    if (this.state.canVote && !this.state.voted) {
      var init = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({token: localStorage.token})
      };
      let promise = fetch('/submissions/upvote/' + this.props.link, init).then(res=>res.json());
      promise.then((data)=>{
        this.recordVote(data.id, Number(localStorage.user));
        this.props.callback(data.votes);
      })
    } else if(!this.state.canVote) {
      this.setState({showSignin: true})
    }
  }

  render() {

    return (
      <div className="videoaction-button" onClick={this.addVote.bind(this)}>
        {this.state.voted === false ?
          <span>Vote Up</span>
          :
          <span className="videoaction-button--voted">Voted!</span>
        }
      </div>

    )
  }
}