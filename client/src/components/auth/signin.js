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
        <div className="label1">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
        )
    }
  }

  render() {
    const { handleSubmit, fields: {email, password} } = this.props;

    return (
    <form className="form1" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <label className="label1">Email</label>
        <input className="input1" {...email} placeholder ="enter your email" className="form-control" />
      </fieldset>
      <fieldset className="form-group">
        <label className="label1">Password</label>
        <input {...password} className="input1" placeholder="enter your password" type="password" className="form-control" />
      </fieldset>
      {this.renderAlert()}
      <button action="submit" className="button1">Sign in</button>
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
