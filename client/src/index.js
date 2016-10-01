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
import Challenges from './components/Challenges';
import Record from './components/record/Record';
import Records from './components/records/Records';
import NotFound from './components/NotFound';
import Signup from './components/auth/signup';
import Home from './components/home/Home';
import Profile from './components/auth/profile';
import FlaggedVideos from './components/admin/FlaggedVideos';
import AdminControls from './components/admin/AdminControls';
import { AUTH_USER, UNAUTH_USER } from './actions/types';
import RequireAuth from './components/auth/require_auth';

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
    <Route path="submission" component={RequireAuth(Submission)} />
    <Route path="challenges" component={Challenges} />
    <Route path="allrecords" component={DecoratedRecords} />
    <Route path='record' component={Record} />
    <Route path="profile" component={Profile} />
    <Route path="flaggedVideos" component={FlaggedVideos} />
    <Route path="adminControls" component={AdminControls} />
    <Route path="*" component={NotFound} />
  </Route>
);
const store = createStoreWithMiddleware(rootReducer)
const token = localStorage.getItem('token');

<<<<<<< ffb86f52153244049bd72b3e922827361323db91
// currently this is a bug, as any token will act like the user is logged in.
// because of bug, userType is being set to 0 by default
if(token) {
  store.dispatch({type: AUTH_USER, userType: 0});
} else {
  store.dispatch({type: UNAUTH_USER})
}
=======
fetch(`/users/${ localStorage.getItem('user') }`)
  .then((currentUser)=> currentUser.json())
  .then((currentUser)=>{
    console.log('user token:', currentUser.type);
    if(token === currentUser.type) {
      store.dispatch({type:AUTH_USER});
    }
  })
>>>>>>> bugbug

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('app')
);