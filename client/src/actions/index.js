import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = "http://localhost:3000";


//ajax(axios) request to server for authentication
//thunk middleware allows us to dispatch without reducers
export function signinUser({email, password}) {
  return function(dispatch) {
  axios.post(`${ROOT_URL}/signin`, {email, password})
    .then(response=>{
      dispatch({ type: AUTH_USER });

      //save token to localStorage(window native method)
      localStorage.setItem('token', response.data.token);
      //sends user to homepage after signed in
      browserHistory.push('/')
    })
    .catch(()=>{
      dispatch(authError('Bad Longin Info'));
    });
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload:error
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return{
    type: UNAUTH_USER
  }
}