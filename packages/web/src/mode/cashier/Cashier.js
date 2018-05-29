// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopBar from '../../components/TopBar';

import Home from './CashierHome';
import Table from './table';

// eslint-disable-next-line react/prefer-stateless-function
class Cashier extends Component {
  render() {
    return (
      <Router>
        <div style={{ display: 'flex', flex: 1 }}>
          <TopBar />
          <Route exact path="/" component={Home} />
          <Route path="/table/:id" component={Table} />
        </div>
      </Router>
    );
  }
}

export default Cashier;
