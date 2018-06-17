// @flow
import React from 'react';
import type { Node } from 'react';
import { Classes, Button, Overlay, FormGroup, Intent } from '@blueprintjs/core';

let gid = 0;

type Props = {
  content: Object,
  title: string,
  onSuccess: (Object) => void,
  children: () => Node | Array<Node>
};

class InputBox extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content,
      visible: true,
    };

    this.Input = ({ label, name, type }) => {
      gid += 1;

      const id = `inp-box-${gid}`;
      return (
        <FormGroup label={label} labelFor={id}>
          <input
            className="pt-input pt-fill"
            type={type}
            id={id}
            value={this.state[name]}
            onChange={this.handleChange(name)}
          />
        </FormGroup>
      );
    };
  }

  handleChange(name) {
    return (e) => {
      const newValue = e.target.value;
      this.setState(prev => ({
        content: {
          ...prev.content,
          [name]: newValue,
        },
      }));
    };
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  }

  ok = async () => {
    const { content } = this.state;
    console.log('Content', content);
    const res = await this.props.onSuccess(content);
    if (res) {
      this.setState({
        visible: false,
      });
    }
  }

  render() {
    const { title } = this.props;
    const { visible } = this.state;

    return (
      <Overlay
        isOpen={visible}
        onClose={this.hide}
        hasBackdrop={false}
        transitionDuration={0}
      >
        <div
          className={`${Classes.CARD}`}
          style={{
            marginTop: '50px',
            flex: 1,
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <h3>{title}</h3>
          {this.props.children({ Input: this.Input })}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={this.hide}>Cancel</Button>
            <Button
              onClick={this.ok}
              intent={Intent.PRIMARY}
            >
              OK
            </Button>
          </div>
        </div>
      </Overlay>
    );
  }
}

export default InputBox;
