import React, {Component} from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class List extends Component {
  constructor(props) {
    let userid=localStorage.getItem('user')
    super(props);
    this.state={};
    this.state.exists = this.props.data.map(one=>{
      return one.Community.name
    })
  }

  joinCommunity(id){
    this.props.joinCommunity(id);
  }

  render() {
    const that = this;
    console.log(this.state.exists, 'whatwhat')
    return (
      <div className="community-container">
        {this.props.all.map(one=>{
          console.log('here', one);
          return(
            <div className="community-body">
            {this.state.exists.indexOf(one.name) > -1 ? <div >{one.name}  <span>Joined</span></div> : <div >{one.name}  <span onClick={that.joinCommunity.bind(this, one.id)}>Join</span></div>
            }
            </div>
            )
        })}
      </div>
      )
  }
}

export default connect(null, actions)(List)