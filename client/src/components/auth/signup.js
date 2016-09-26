import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { options } from './states';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Sorry</strong> {this.props.errorMessage}
        </div>
        )
    }
  }

  renderStates() {
    return (
      <select name="state">
        {options.map(option=>{
          return <option value={option}>{option}</option>
        })};
      </select>
      )
  }

  render() {
    const { handleSubmit, fields: {email, password, passwordConfirm, username, state}} = this.props
    return(

      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Username: </label>
          <input clasName="form-control" {...username}/>
          {username.touched && username.error && <div className="error">{username.error}</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Email: </label>
          <input clasName="form-control" {...email}/>
          {email.touched && email.error && <div className="error">{email.error}</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input clasName="form-control" {...password} type="password" />
          {password.touched && password.error && <div className="error">{password.error}</div> }
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password: </label>
          <input clasName="form-control" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div> }
        </fieldset>
        <fieldset className="form-group">
            <label>State: </label>
          {this.renderStates()}
          {state.touched && state.error && <div className="error">{state.error}</div> }
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign Up</button>
        {this.renderAlert()}
      </form>
      )
  }
}

function validate(formProps) {
  const errors = {};
  if(!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a confirmation';
  }

  if(!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match';
  }

  return errors;
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error}
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm', 'username', 'state', 'country'],
  validate: validate,
},mapStateToProps, actions)(Signup);