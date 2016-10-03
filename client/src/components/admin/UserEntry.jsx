import React from 'react';
import { Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';

export default class UserEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.view = 'normal';
    this.state.type;
    this.state.showModal = false;
  }


  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  renderUser() {
    if(this.state.view === 'normal') {
      return (
        [
        <td>{this.props.user.username}</td>,
        <td>{this.props.user.email}</td>,
        <td>{this.props.user.type}</td>,
        <td>{this.props.user.froozen}</td>,
        <td>
          <button onClick={this.changeView.bind(this, 'edit')} type="button" className="btn btn-success btn-xs">Edit</button>
          <button onClick={this.open.bind(this)} type="button" className="btn btn-danger btn-xs">Delete</button>
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
        <td>{this.props.user.froozen}</td>,
        <td>
          {this.state.type > 0 && this.state.type < 4 ? <button
            type="button"
            className="btn btn-success btn-xs"
            onClick={this.saveUser.bind(this)}>Save</button> : null}
          <button onClick={this.open.bind(this)} type="button" className="btn btn-danger btn-xs">Delete</button>
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
      data: JSON.stringify({type: this.state.type})
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
      data: JSON.stringify({froozen: true})
    })
    .done((user) => {
      this.props.user.username = 'deleted';
      this.props.user.email = 'deleted';
      this.props.user.type = 'deleted';
      this.close.bind(this);
    }
  }

  render() {

    return (
      <tr>
        {this.renderUser()}

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Freeze A User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Are you sure you want to freeze this user?</h3>
            <p>A froozen user will not be allowed to log back into this site until they are unfroozen again</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.close.bind(this)}>Yes Freeze User</Button>
          </Modal.Footer>
        </Modal>
      </tr>
    )
  }
}
