import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { state_list, country_list, canada_list } from './states';

class Signup extends Component {
  constructor (props){
    super(props)
    this.state = {state: '', country:''}
  }

  onSelectChange(event) {
    console.log(event.target.value)
    this.setState({country: event.target.value})
  }

  handleFormSubmit(formProps) {
    console.log(formProps)
    this.props.signupUser(formProps);
    this.setState({country:''})
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

  renderCountry() {
    return (
      <select onChange={this.onSelectChange.bind(this)} name="country" >
        <option></option>
        {country_list.map(country=>{
          return <option value={country} >{country}</option>
        })};
      </select>
      )
  }

  renderStates(formProps) {
    if(this.state.country === "United States") {
    return (
      <select name="state">
        <option></option>
        {state_list.map(state=>{
          return <option value={state} >{state}</option>
        })};
      </select>
      )
    }
    if(this.state.country === "Canada") {
      return (
      <select name="state">
        <option></option>
        {canada_list.map(state=>{
          return <option value={state} >{state}</option>
        })};
      </select>
      )
    } else {
      return (
      <select name="state">
        <option>N/A</option>
      </select>
      )
    }
}

  render() {
    const { handleSubmit, fields: {email, password, passwordConfirm, username, state, country}} = this.props
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
        <fieldset className="form-group" {...country}>
            <label>Country: </label>
          {this.renderCountry()}
        </fieldset>
        <fieldset className="form-group" {...state}>
            <label>State/Province: </label>
          {this.renderStates()}
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