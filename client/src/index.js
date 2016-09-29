import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

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
import { AUTH_USER } from './actions/types';
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
    <Route path="*" component={NotFound} />
  </Route>
);
const store = createStoreWithMiddleware(rootReducer)
const token = localStorage.getItem('token');
if(token) {
  store.dispatch({type: AUTH_USER});
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('app')
);