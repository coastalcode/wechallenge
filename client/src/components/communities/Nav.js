import React, {Component} from 'react';

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state={};
    this.state.communities=[];

  }

  // fetchCommunities() {
  //   const userID = localStorage.getItem('user');
  //   fetch(`/communities/${userID}`)
  //     .then((communities)=> communities.json())
  //     .then((communities)=>{
  //       this.setState({communities});
  //       console.log('data communities', communities)
  //     })
  // }

  // componentDidMount() {
  //   this.fetchCommunities();
  // }

  render() {
    const that = this;
    return (
      <div className="records-catlist">
        <div className="panel-group" id="accordion">
        {this.props.communities.map(function(community){
          return (
            <div onClick={()=> that.props.open(community.CommunityId)} className="panel panel-default">
              <div className="panel-heading">
              {community.Community.name}
              </div>
            </div>
            )
        })}
        <div onClick={this.props.submit}className="panel-group" id="accordion">
        <div className="panel panel-default">
          <div className="panel-heading">Create One</div>
        </div>
        </div>
        </div>
      </div>
      )
  }
}

