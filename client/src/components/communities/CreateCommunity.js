import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class CreateCommunity extends Component{
  constructor(props) {
    super(props);
  }

  handleFormSubmit(formProps) {
    console.log(formProps);
    this.props.createCommunity(formProps);
  }

  render() {
    const { handleSubmit, fields: {name, description}} = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <h1>Create Your Community</h1>
      <fieldset className="form-group">
        <label className="label1">Name</label>
        <input className="form-control input1" {...name}/>
        {name.touched && name.error && <div className="error">{name.error}</div> }
      </fieldset>

      <fieldset className="form-group">
        <label className="label1">Description</label>
        <input className="form-control input1" {...description} />
        {description.touched && description.error && <div className="error">{description.error}</div> }
      </fieldset>

      <button action="submit" onClick={this.props.close} className='button1'>Create</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if(!formProps.name) {
    errors.name = 'Please enter a valid name of your community'
  }

  if(!formProps.description) {
    errors.description = 'Please enter a brief description of your community';
  }

  return errors;
}

export default reduxForm({
  form: 'createCommunity',
  fields: ['name', 'description'],
  validate: validate,
}, null, actions)(CreateCommunity);