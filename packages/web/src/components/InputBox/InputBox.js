// @flow
import React from 'react';
import type { Node } from 'react';
import { Classes, Button, Overlay, FormGroup, Intent } from '@blueprintjs/core';

let gid = 0;

type Props = {
  content: Object,
  title: string,
  onSuccess: (Object) => void,
  onChange: (Object) => void,
  children: () => Node | Array<Node>
};

function getClassName(type) {
  if (type === 'text' || type === 'password') {
    return 'pt-input';
  } else if (type === 'checkbox') {
    return 'pt-control pt-switch';
  }

  return 'pt-input';
}

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
      const className = getClassName(type);
      return (
        <FormGroup label={label} labelFor={id}>
          <input
            className={className}
            type={type}
            id={id}
            value={this.state.content[name]}
            checked={this.state.content[name]}
            onChange={this.handleChange(name)}
          />
        </FormGroup>
      );
    };
  }

  handleChange(name) {
    return (e) => {
      const newValue = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
      // const newValue = e.target.value;
      // console.log('Handle Change value', newValue);
      this.setState((prev) => {
        const newContent = {
          ...prev.content,
          [name]: newValue,
        };

        if (this.props.onChange) {
          this.props.onChange(newContent);
        }

        this.setState({
          content: newContent,
        });
      });
    };
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  }

  ok = async () => {
    const { content } = this.state;
    const res = await this.props.onSuccess(content);
    if (res) {
      this.setState({
        visible: false,
      });
    }
  }

  render() {
    const { title } = this.props;
    const { visible, content } = this.state;

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
          {this.props.children({ Input: this.Input, content })}
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
