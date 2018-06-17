import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import InputBox from './components/InputBox';

import './App.css';

import Mode from './mode';

const Context = React.createContext({});

class App extends Component {
  state = {
    Prompt: null,
  };

  componentDidMount() {
    App.self = this;
  }

  getTopBar = () => this.bar

  registerTopBar = (bar) => {
    this.bar = bar;
  }

  unregisterTopBar = () => {
    this.bar = null;
  }

  render() {
    const { Prompt } = this.state;

    return (
      <div className="App">
        <Provider store={store}>
          <Context.Provider value={this}>
            <Mode />
            {Prompt}
          </Context.Provider>
        </Provider>
      </div>
    );
  }
}

let id = 0;

App.prompt = (child, props) => {
  id += 1;
  App.self.setState({
    Prompt: (
      <InputBox key={id} {...props}>{child}</InputBox>
    ),
  });
};

export const { Consumer } = Context;

export default App;
