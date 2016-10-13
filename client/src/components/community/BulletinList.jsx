import React from 'react';
import BulletinEntry from './BulletinEntry';

export default class BulletinList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newsubject: "",
      newmessage: "",
      bulletins: [],
      pinnedBulletins: [],
      regularBulletins: []
    }
  }

  fetchBulletins() {
    let that = this;
    let init = {
      method: 'GET',
      headers: new Headers()
    }

    fetch(`/bulletins/${ this.props.cid }`)
      .then((bulletins)=> bulletins.json())
      .then((bulletins)=>{
        this.setState({ bulletins });
        return bulletins })
      .then((bulletins)=>
        that.udpateBulletins() )
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
    this.udpateBulletins();
  }

  udpateBulletins() {
    this.setState({ pinnedBulletins : this.state.bulletins.filter((bulletin)=> bulletin.pinned) })
    this.setState({ regularBulletins : this.state.bulletins.filter((bulletin)=> !bulletin.pinned) })
  }

  addbulletin(subject, message) {
    let bulletin = {
      subject: subject,
      message: message,
      userId: localStorage.getItem('user'),
      communityId: this.props.cid
    }

    this.postBulletin(bulletin)
    .then((data)=> this.fetchBulletins());
  }

  render() {
      let userId = localStorage.getItem('user')

      return (
      <div className="bulletinList">

        { (this.state.pinnedBulletins.length) ? <div>{ this.state.pinnedBulletins.map((bulletin) =>
          <BulletinEntry
            key={ bulletin.id }
            uid={ userId }
            bulletin={ bulletin }
            fetch={ this.fetchBulletins.bind(this) }/>) } </div>: null }

        { (this.state.regularBulletins.length) ? <div>{ this.state.regularBulletins.map((bulletin) =>
          <BulletinEntry
            key={ bulletin.id }
            uid={ userId }
            bulletin={ bulletin }
            fetch={ this.fetchBulletins.bind(this) }/>) } </div>: null }

        { userId ? (<div><br/>
        <input placeholder="subject" onChange={ event => this.setState({ newSubject: event.target.value}) } />
        <br/>
        <input placeholder="message" onChange={ event => this.setState({ newMessage: event.target.value}) } />
        <br/>
        <button onClick={ event =>{ this.addbulletin(this.state.newSubject, this.state.newMessage) }}>
          Add a bulletin!
        </button></div>) : "Login to add a message!" }
      </div>
    )
  }
}

