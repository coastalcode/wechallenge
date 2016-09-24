import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  //on submit, invoke singinUser function (inside action folder)
  //action then sends its action types to a specific reducer (inside reducer folder)
  handleFormSubmit({email, password}) {
    this.props.signinUser({email,password});
  }
  //warning message for password mismatch
  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
        )
    }
  }

  render() {
    const { handleSubmit, fields: {email, password} } = this.props;

    return (
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <label>Email:</label>
        <input {...email} className="form-control" />
      </fieldset>
      <fieldset className="form-group">
        <label>Password:</label>
        <input {...password} type="password" className="form-control" />
      </fieldset>
      {this.renderAlert()}
      <button action="submit" className="btn btn-primary">Sign in</button>
    </form>
    );
  }
}

//retrieving redux state
function mapStateToProps(state) {
  return { errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
},mapStateToProps, actions)(Signin)

