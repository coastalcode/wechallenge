import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { tokens } from './actions/index';

import App from './components/App';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Submission from './components/Submission';
import Challenge from './components/challenge/Challenge';
import Record from './components/record/Record';
import Records from './components/records/Records';
import NotFound from './components/NotFound';
import Signup from './components/auth/signup';
import Home from './components/home/Home';
import Profile from './components/auth/profile';
import FlaggedVideos from './components/admin/FlaggedVideos';
import AdminControls from './components/admin/AdminControls';
import NeedSuperUser from './components/NeedSuperUser';
import NeedAdminUser from './components/NeedAdminUser';
import Community from './components/community/CRecords'; //needs to be changed

import { AUTH_USER, UNAUTH_USER } from './actions/types';
import {RequiresTypeOne, RequiresTypeTwo, RequiresTypeThree} from './components/auth/require_auth';

import rootReducer from './reducers';

// Wrapping components to pass in props before using with React Router
// These two functions do this for us:
function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}
function withStaticProps(componentName, props) {
  return Wrapee => {
    class Wrapper extends React.Component {
      render() {
        return <Wrapee { ...this.props } { ...props } />;
      }
    }
    Wrapper.displayName = `${componentName}(${getDisplayName(Wrapee)})`;
    return Wrapper;
  };
}

// Wrapping components with props here
// Only top level components are wrapped, since child components will have props passed down
// Passs these into React Router instead of original components
const DecoratedRecord = withStaticProps('NewRecord', { foo: 'bar' })(Record)
const DecoratedRecords = withStaticProps('NewRecords', { foo: 'bar' })(Records)

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const routes = (
  <Route path="/" component={App}>
    <Route path="signin" component={Signin} />
    <Route path="signout" component={Signout} />
    <Route path="signup" component={Signup} />

    <Route path="submission" component={RequiresTypeOne(Submission)} />
    <Route path='challenge/:id' component={Challenge} />
    <Route path="allrecords" component={DecoratedRecords} />
    <Route path='record' component={Record} />
    <Route path='community' component={Community} />

    <Route path="profile" component={Profile} />
    <Route path="flaggedVideos" component={RequiresTypeTwo(FlaggedVideos)} />
    <Route path="adminControls" component={RequiresTypeThree(AdminControls)} />
    <Route path="needSuperUser" component={NeedSuperUser} />
    <Route path="needAdminUser" component={NeedAdminUser} />
    <Route path="*" component={NotFound} />
  </Route>
);
const store = createStoreWithMiddleware(rootReducer)
const token = localStorage.getItem('token');

fetch(`/users/${ localStorage.getItem('user') }`)
  .then((currentUser)=> currentUser.json())
  .then((currentUser)=>{
    if(token === currentUser.test) {
      console.log('tokens match');
      store.dispatch({type:AUTH_USER, userType: currentUser.type});
    } else {
      console.log('tokens don\'t match');
      store.dispatch({type: UNAUTH_USER});
    }
  })


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('app')
);