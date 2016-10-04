import React from 'react';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

export default class UserEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.view = 'normal';
    this.state.type;
    this.state.showFreezeModal = false;
    this.state.showMeltModal = false;
  }


  closeFreeze() {
    this.setState({ showFreezeModal: false });
  }

  openFreeze() {
    this.setState({ showFreezeModal: true });
  }

  closeMelt() {
    this.setState({ showMeltModal: false });
  }

  openMelt() {
    this.setState({ showMeltModal: true });
  }

  renderUser() {
    if(this.state.view === 'normal') {
      return (
        [
        <td>{this.props.user.username}</td>,
        <td>{this.props.user.email}</td>,
        <td>{this.props.user.type}</td>,
        <td>{this.props.user.frozen}</td>,
        <td>
          <button onClick={this.changeView.bind(this, 'edit')} type="button" className="btn btn-success btn-xs">Edit</button>
          {this.props.user.frozen === 0 ? <button onClick={this.openFreeze.bind(this)} type="button" className="btn btn-danger btn-xs">Freeze</button> : <button onClick={this.openMelt.bind(this)} type="button" className="btn btn-danger btn-xs">Melt</button>}
        </td>,
        ]
      )
    } else if(this.state.view === 'edit') {
      return (
        [
        <td>{this.props.user.username}</td>,
        <td>{this.props.user.email}</td>,
        <td>
          <input
            type="number"
            name="type"
            defaultValue={this.props.user.type}
            onChange={ event => this.setState({type: event.target.value})}>
          </input>
        </td>,
        <td>{this.props.user.frozen}</td>,
        <td>
          {this.state.type > 0 && this.state.type < 4 ? <button
            type="button"
            className="btn btn-success btn-xs"
            onClick={this.saveUser.bind(this)}>Save</button> : null}
          {this.props.user.frozen === 0 ? <button onClick={this.openFreeze.bind(this)} type="button" className="btn btn-danger btn-xs">Freeze</button> : <button onClick={this.openMelt.bind(this)} type="button" className="btn btn-danger btn-xs">Melt</button>}
        </td>,
        ]
      )
    }
  }

  changeView(view) {
    this.setState({ view });
  }

  saveUser() {
    $.ajax({
      url: '/users/' + this.props.user.id,
      method: 'PUT',
      data: JSON.stringify({type: this.state.type, token: localStorage.token})
    })
    .done((user) => {
      this.props.user.type = this.state.type;
      this.setState({view: 'normal'});
    })
    .fail((msg) => {
      console.log('failed to fetch users: ', msg);
    })
  }

  freezeUser() {
    $.ajax({
      url: '/users/' + this.props.user.id,
      method: 'PUT',
      data: JSON.stringify({frozen: 1, token: localStorage.token})
    })
    .done((user) => {
      this.props.user.frozen = 1;
      this.closeFreeze();
    })
  }

  meltUser() {
    $.ajax({
      url: '/users/' + this.props.user.id,
      method: 'PUT',
      data: JSON.stringify({frozen: 0, token: localStorage.token})
    })
    .done((user) => {
      this.props.user.frozen = 0;
      this.closeMelt();
    })
  }

  render() {

    return (
      <tr>
        {this.renderUser()}

        <Modal show={this.state.showFreezeModal} onHide={this.closeFreeze.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Freeze A User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Are you sure you want to freeze this user?</h3>
            <p>A frozen user will not be allowed to log back into this site until they are unfrozen again</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeFreeze.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.freezeUser.bind(this)}>Yes Freeze User</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showMeltModal} onHide={this.closeMelt.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Melting A User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Are you sure you want to Melt this user?</h3>
            <p>A melted user will  be allowed to log back into this site </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeMelt.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.meltUser.bind(this)}>Yes Melt User</Button>
          </Modal.Footer>
        </Modal>
      </tr>
    )
  }
}
