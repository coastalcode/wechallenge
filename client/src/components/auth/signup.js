import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { state_list, country_list, canada_list } from './states';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
      <select className="select1" onChange={this.onSelectChange.bind(this)} name="country" >
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
      <select className="select1" name="state">
        <option></option>
        {state_list.map(state=>{
          return <option value={state} >{state}</option>
        })};
      </select>
      )
    }
    if(this.state.country === "Canada") {
      return (
      <select className="form-control select1" name="state">
        <option></option>
        {canada_list.map(state=>{
          return <option value={state} >{state}</option>
        })};
      </select>
      )
    } else {
      return (
      <select className="select1" name="state">
        <option>N/A</option>
      </select>
      )
    }
}

  render() {
    const { handleSubmit, fields: {email, password, passwordConfirm, username, state, country}} = this.props
    return(
      <form className="form1" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label className="label1">Username</label>
          <input className="form-control input1" {...username}/>
          {username.touched && username.error && <div className="error1">{username.error}</div> }
        </fieldset>

        <fieldset className="form-group">
          <label className="label1">Email</label>
          <input className="form-control input1" {...email}/>
          {email.touched && email.error && <div className="error1">{email.error}</div> }
        </fieldset>

        <fieldset className="form-group">
          <label className="label1" >Password</label>
          <input className="form-control input1" {...password} type="password" />
          {password.touched && password.error && <div className="error1">{password.error}</div> }
        </fieldset>

        <fieldset className="form-group">
          <label className="label1">Confirm Password</label>
          <input className="form-control input1" {...passwordConfirm} type="password" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error1">{passwordConfirm.error}</div> }
        </fieldset>
        <button action="submit" className="button1">Sign Up</button>
        {this.renderAlert()}
      </form>
      )
  }
}

function validate(formProps) {
  const errors = {};
  if(!formProps.username) {
    errors.username = 'Please enter a valid username'
  }

  if(!formProps.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email';
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a confirmation';
  }

  if(!formProps.password) {
    errors.password = 'Please enter a password longer than 4';
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error}
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error}
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm', 'username', 'state', 'country'],
  validate: validate,
},mapStateToProps, actions)(Signup);