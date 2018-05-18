// @flow
import React, { Component, Fragment } from 'react';
import { Button, Intent } from '@blueprintjs/core';

import Form from './components/Form';

import logo from './logo.svg';
import './App.css';

class Line extends Component {
  state = {
    item: null,
  }

  onMouseEnter = () => {
    this.setState({ item: this.props.arrayItem });
  }

  onMouseLeave = () => {
    this.setState({ item: null });
  }

  render() {
    const { item } = this.state;

    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {this.props.children}
        {item && (
          <Fragment>
            <button onClick={(e) => { e.preventDefault(); item.remove(); }}>Remove</button>
            <button onClick={(e) => { e.preventDefault(); item.add(); }}>Add</button>
            <button onClick={(e) => { e.preventDefault(); item.insertAfter(); }}>Insert</button>
          </Fragment>
        )}
      </div>
    );
  }
}

const LineDiv = Form.injectArrayItem(Line);

const Example = (props) => {
  return (
    <input type="text" value={props.item} />
  );
};

// eslint-disable-next-line react/prefer-stateless-function, react/no-multi-comp
class App extends Component {
  render() {
    return (
      <div className="App">
        <Form onSubmit={(data) => console.log(JSON.stringify(data, null, 2)) } value={{ arr: [null, null] }} onChange={v => console.log('onChangeForm', v)}>
          <Form.Input name="field1" type="text" />
          <Form.Input name="field2" type="text" />
          <Form.Group name="grp" onChange={v => console.log('onChangeGroup', v)}>
            <Form.Input name="field3" type="text" />
            <Form.Input name="field4" type="text" />
          </Form.Group>
          <Form.Array
            name="arr"
            onChange={v => console.log('onChangeArray', v)}
            onItemChange={(idx, v) => console.log('onItemChange', idx, v)}
          >
            <span><Form.Tracker name="f1" /></span>
            <LineDiv>
              <Form.Input name="f1" type="text" />
              <Form.Tracker name="f1" content={value => `${value && value.toUpperCase()}`} />
            </LineDiv>
          </Form.Array>
        </Form>
      </div>
    );
  }
}

export default App;
