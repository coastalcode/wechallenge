import React from 'react';

export default class Voting extends React.Component {
  constructor(props) {
    super(props);
    console.log('voting stored', this.props)
    this.state = {
      canVote: false
    };
  }

  componentDidMount() {
      if (localStorage.token) {
        this.setState({canVote: true});
      }
  }

  addVote() {
    if (this.state.canVote) {
      console.log('voting')
      var init = {
        method: 'POST',
        headers: new Headers()
      };
      let promise = fetch('/submission/upvote/' + this.props.link, init).then((res)=>{
        console.log('res', res)
        return res.json()
      });
      promise.then((data)=>{
        console.log('voting data', data)
      })
    } else {
      console.log('sign up or sign in')
    }
  }

  render() {
    return <span onClick={this.addVote.bind(this)} className="videoaction-button">Vote Up</span>
  }
}