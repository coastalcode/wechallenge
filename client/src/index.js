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
import Records from './components/Records';
import NotFound from './components/NotFound';
import Signup from './components/auth/signup';
import Home from './components/home/Home';

import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const routes = (
  <Route path="/" component={App}>
    <Route path="signin" component={Signin} />
    <Route path="signout" component={Signout} />
    <Route path="signup" component={Signup} />
    <Route path="submission" component={Submission} />
    <Route path="challenges" component={Challenges} />
    <Route path="record" component={Records} />
    <Route path="*" component={NotFound} />
  </Route>
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={browserHistory}>
      { routes }
    </Router>
  </Provider>,
  document.getElementById('app')
);