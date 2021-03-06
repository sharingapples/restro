// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

import logo from '../../logo.svg';

const Auth = () => (
  <Router>
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={logo} style={{ width: '100px' }} alt="logo" />
      <h4>Restro.NET</h4>
      <Switch>
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset/:token" component={ResetPassword} />
        <Route component={Login} />
      </Switch>
    </div>
  </Router>
);

export default Auth;
