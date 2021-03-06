// @flow
import React from 'react';
import { connect } from 'react-redux';

import Auth from './auth';
import Waiter from './waiter';
import Admin from './admin';
import Cashier from './cashier';

import logo from '../logo.svg';

const modes = {
  Auth,
  Waiter,
  Cashier,
  Admin,
};

type Props = {
  mode: string,
}

const Mode = ({ mode }: Props) => {
  const M = modes[mode];
  if (M) {
    return (
      <div style={{ display: 'flex', flex: 1, overflowY: 'scroll' }}>
        <M />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <a href="/">
        <div>
          <img src={logo} style={{ width: '150px' }} alt="Logo" />
          <h2>Restro.NET</h2>
        </div>
      </a>
    </div>
  );
};

const mapStateToProps = ({ account }) => ({
  mode: (account.user && account.user.restros[0].role) || (account.sessionId ? 'Wait' : 'Auth'),
});

export default connect(mapStateToProps)(Mode);

