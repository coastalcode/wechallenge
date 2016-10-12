import React from 'react';

export default class CommunityInvites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      communities: [],
      invites: [],
      receiver: 0,
      message: "",
      communityid: 0
    }
  }

  fetchUsers() {
    fetch(`/users`)
      .then((users)=> users.json())
      .then((users)=>{
        this.setState({ users })
    })
  }

  fetchCommunities() {
    fetch(`/communitiesall`)
      .then((communities)=> communities.json())
      .then((communities)=>{
        this.setState({ communities })
    })
  }

  fetchInvites() {
    console.log("fetching")
    fetch(`/communityinvite`)
      .then((invites)=> invites.json())
      .then((invites)=>{
        this.setState({ invites })
    })
  }

  sendInvite() {
    let that = this;
    let invite = {
      sender: localStorage.getItem('user'),
      receiver: this.state.receiver,
      message: this.state.message,
      done: 0,
      communityid: this.state.communityid
    }

    fetch('/communityinvite', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        body: JSON.stringify(invite)
    }).then((response)=> {
      console.log("Thanks for sending an invite!")
      that.fetchInvites()
    })
  }

  clearInvite(id) {
    let that = this;
    fetch(`/communityinvite/delete/${id}`)
      .then((done)=>{
        console.log("You deleted an invite!");
        that.fetchInvites();
    })
  }



  componentDidMount() {
    this.fetchUsers();
    this.fetchCommunities();
    this.fetchInvites();
  }

  render() {
    let that = this;
    console.log("this is the users", this.state.invites)
    return (
      <div>

            { this.state.users.map((user) =>
            <button onClick={ event => that.setState({ receiver: user.id }) } >
              { user.username }
            </button>) }


          {this.state.communities.map((community) =>
          <button onClick={ event => that.setState({ communityid: community.id }) } >
            { community.name }
          </button>)}

        <input onChange={
          event => that.setState({ message: event.target.value }) }/>

        <button onClick={ event => that.sendInvite() }>
          Send invite!
        </button>

          {this.state.invites.map((invite) =>
          <div>
          <button onClick={ event => that.clearInvite(invite.id) } >
            { invite.message }
          </button>
          </div>)}
      </div>

    )
  }
}