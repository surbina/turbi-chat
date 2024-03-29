import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import createStore from './store';
import { Login } from './login';
import { Chat } from './chat';
import Demo from './demo';

const routes = {
  LOGIN: {
    path: '/login',
    component: Login,
  },
  CHAT: {
    path: '/chat',
    component: Chat,
  },
  DEMO: {
    path: '/demo',
    component: Demo,
  },
  DEFAULT: {
    path: '/',
    component: () => (<Redirect to="/login" />),
  },
};

function App() {
  return (
    <Provider store={createStore()}>
      <Router>
        <Switch>
          <Route {...routes.LOGIN} />
          <Route {...routes.CHAT} />
          <Route {...routes.DEMO} />
          <Route {...routes.DEFAULT} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
