import React from 'react';

export default class UserEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.view = 'normal';
    this.state.type;
  }

  renderUser() {
    if(this.state.view === 'normal') {
      return (
        [
        <td>{this.props.user.username}</td>,
        <td>{this.props.user.email}</td>,
        <td>{this.props.user.type}</td>,
        <td>
          <button onClick={this.changeView.bind(this, 'edit')} type="button" className="btn btn-success btn-xs">Edit</button>
          <button type="button" className="btn btn-danger btn-xs">Delete</button>
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
        <td>
          {this.state.type > 0 && this.state.type < 4 ? <button
            type="button"
            className="btn btn-success btn-xs"
            onClick={this.saveUser.bind(this)}>Save</button> : null}
          <button type="button" className="btn btn-danger btn-xs">Delete</button>
        </td>,
        ]
      )
    }
  }

  changeView(view) {
    this.setState({ view });
  }

  saveUser() {
    console.log('state: ', this.state);
    console.log('user: ', this.props.user);
    $.ajax({
      url: '/users/' + this.props.user.id,
      method: 'PUT',
      data: JSON.stringify({type: this.state.type})
    })
    .done((users) => {
      this.props.user.type = this.state.type;
      this.setState({view: 'normal'});
    })
    .fail((msg) => {
      console.log('failed to fetch users: ', msg);
    })
  }

  render() {
    return (
      <tr>
        {this.renderUser()}
      </tr>
    )
  }
}
