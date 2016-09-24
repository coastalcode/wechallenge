import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

//action is dispatched to appropriate state based on specific reducers
//we now have two immutable states in redux: 1. form  2. authentication
//can be accessed by typing in state.form or state.auth
const rootReducer = combineReducers({
  form: form,
  auth: authReducer
});

export default rootReducer;
