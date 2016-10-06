import React from 'react';
import BulletinEntry from './BulletinEntry';

export default class BulletinList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newsubject: "",
      newmessage: "",
      bulletins: []
    }
  }

  fetchBulletins() {
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/bulletins/${ this.props.cid }`)
      .then((bulletins)=> bulletins.json())
      .then((bulletins)=>{
        this.setState({ bulletins });
        console.log(bulletins)
    })
  }

  postBulletin(bulletin) {
    return fetch('/bulletins/', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(bulletin)
    }).then(function(response) {
        console.log(response);
    })
  }

  componentDidMount() {
    this.fetchBulletins();
  }

  addbulletin(subject, message) {
    let bulletin = {
      subject: subject,
      message: message,
      userId: 1,
      communityId: this.props.cid
    }
    console.log("bulletin to be added", bulletin)
    this.postBulletin(bulletin)
    .then((data)=> this.fetchBulletins());
  }

  render() {
      let userId = localStorage.getItem('user')
      return (true) ? (
      <div className="bulletinList">
        { this.state.bulletins.map((bulletin) =>
          <BulletinEntry
            key={ bulletin.id }
            bulletin={ bulletin }
            fetch={ this.fetchBulletins.bind(this) }/>) }
        { userId ? (<div><br/>
        <input placeholder="subject" onChange={ event => this.setState({ newSubject: event.target.value}) } />
        <br/>
        <input placeholder="message" onChange={ event => this.setState({ newMessage: event.target.value}) } />
        <br/>
        <button onClick={ event =>{ this.addbulletin(this.state.newSubject, this.state.newMessage) }}>
          Add a bulletin!
        </button></div>) : "Login to add a message!" }
      </div>
    ) : null
  }
}