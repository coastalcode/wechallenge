import React, {Component} from 'react';

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state={};
    this.state.communities=[];
  }

  render() {
    const that = this;
    return (
      <div className="list-container">
        <div className="list-item" id="accordion">
        {this.props.communities.map(function(community){
          return (
            <div className="panel panel-default">
            <div className="panel-heading">
              <div
              onClick={()=> that.props.open(community.CommunityId)}
              className="panel-title">
              {community.Community.name}
              </div>
              </div>
          </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

