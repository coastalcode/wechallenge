import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

const ROOT_URL = '';
export let tokens;
//ajax(axios) request to server for authentication
//thunk middleware allows us to dispatch without reducers
export function signinUser({email, password}) {
  return function(dispatch) {
  axios.post(`${ROOT_URL}/signin`, {email, password})
    .then(response=>{
      dispatch({ type: AUTH_USER, userType: response.data.user.type });
      //save token to localStorage- browser native method
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user.id);
      //sends user to homepage after authenticated
      browserHistory.push('/')
    })
    .catch(()=>{
      dispatch(authError('Bad Login Info'))
    });
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  return{
    type: UNAUTH_USER
  }
}

export function signupUser({email, password, username, state, country}) {
  return function(dispatch) {
    console.log(country);
    axios.post(`${ROOT_URL}/signup`, {email, password, username, state, country, type: 1})
      .then(response=>{
        dispatch({ type: AUTH_USER, userType: response.data.user.type });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', response.data.user.id);
        browserHistory.push('/')
      })
      .catch(response=> {dispatch(authError('Email in use'))
      });
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload:error
  }
}

export function createCommunity({name, description}) {
  let userID = localStorage.getItem('user');
  return function(dispatch) {
    axios.post('/communities', {name, description, userid:userID})
      .then(response=>{
        console.log('community created');
        browserHistory.push('/communities')
      })
      .catch(response=> {
        console.log('error :', response);
      })
  }
}
