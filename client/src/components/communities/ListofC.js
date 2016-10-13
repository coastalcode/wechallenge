import React, {Component} from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

class List extends Component {
  constructor(props) {
    let userid=localStorage.getItem('user')
    super(props);
    this.state={};
    this.state.showJoin = false;
    this.state.exists = this.props.data.map(one=>{
      return one.Community.name
    })
    this.state.real = this.props.all.filter(one=>{
      return this.state.exists.indexOf(one.name) === -1
    })
    this.state.showJoin = false;
    this.state.currentCom = null;
    this.state.description = null;
    this.state.name = null;

  }

  openJoin(id, description, name) {
    this.setState({ showJoin: true });
    this.setState({ currentCom: id});
    this.setState({ description: description})
    this.setState({ name })
  }

  closeJoin() {
    this.setState({ showJoin: false });
  }

  joinCommunity(id){
    this.props.joinCommunity(id);
    this.setState({ currentCom: null});
    this.setState({ description: null});
    this.setState({ showJoin: false });
    location.reload(true);
  }

  render() {
    const that = this;
    console.log(this.state.exists, 'whatwhat')
    console.log(this.state.currenCom, 'iteration!!')

    let current = this.state.currenCom
    if(this.props.checkForMatching(this.state.exists, this.props.search)) {

    }
    return (
      <div>
      <ul className="community-container">
        {this.state.real.map(one=>{
          console.log('here', one);
          return(
            <li onClick= {this.openJoin.bind(this, one.id, one.description, one.name)} className="community-item">
            <div>{one.name}</div>
            </li>
            )
        })}
      </ul>

      <Modal show={this.state.showJoin} onHide={this.closeJoin.bind(this)}>
        <Modal.Header closeButton>
        <h1>Join {this.state.name}</h1>
        </Modal.Header>
        <Modal.Body className="form-group">
        <label className="label1">{this.state.description}</label>
        </Modal.Body>
        <Modal.Footer>
        <Button className="button1" onClick={this.joinCommunity.bind(this, this.state.currentCom )}>Join</Button>
        </Modal.Footer>
      </Modal>

      </div>
      )
  }
}

export default connect(null, actions)(List)




// {this.props.all.map(one=>{
//           console.log('here', one);
//           return(
//             <li onClick= {this.props.openJoin} className="community-item">
//             {this.state.exists.indexOf(one.name) > -1 ? <div className="joined">{one.name}</div> : <div className="join">{one.name}</div>
//             }
//             </li>
//             )
//         })}

// <span className="join" onClick={that.joinCommunity.bind(this, one.id)}>Join</span>