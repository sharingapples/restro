// @flow
import React from 'react';
import { connect } from 'react-redux';

import Auth from './auth';
import Waiter from './waiter';
// import Admin from './admin';
import Cashier from './cashier';

import logo from '../logo.svg';

const modes = {
  Auth,
  Waiter,
  Cashier,
  Admin: Cashier,
};

type Props = {
  mode: string,
}

const Mode = ({ mode }: Props) => {
  console.log('Render with mode', mode);
  const M = modes[mode];
  if (M) {
    return (
      <div style={{ display: 'flex', flex: 1 }}>
        <M />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <img src={logo} style={{ width: '150px' }} alt="Logo" />
        <h2>Restro.NET</h2>
      </div>
    </div>
  );
};

const mapStateToProps = ({ account }) => ({
  mode: (account.user && account.user.restros[0].role) || (account.sessionId ? 'Wait' : 'Auth'),
});

export default connect(mapStateToProps)(Mode);

