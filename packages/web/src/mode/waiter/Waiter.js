// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopBar from '../../components/TopBar';

import Home from './WaiterHome';
import Table from './table';

class Waiter extends Component {
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

export default Waiter;
