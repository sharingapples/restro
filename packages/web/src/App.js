import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux';

import './App.css';

import Mode from './mode';

const Context = React.createContext({});

class App extends Component {
  getTopBar = () => this.bar

  registerTopBar = (bar) => {
    this.bar = bar;
  }

  unregisterTopBar = () => {
    this.bar = null;
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Context.Provider value={this}>
            <Mode />
          </Context.Provider>
        </Provider>
      </div>
    );
  }
}

export const { Consumer } = Context;

export default App;
