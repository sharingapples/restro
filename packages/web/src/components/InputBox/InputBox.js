import React from 'react';
import { Overlay, FormGroup, Intent } from '@blueprintjs/core';

let gid = 0;

const el = document.createElement('div');
document.body.appendChild(el);

class InputBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content,
      visible: props.visible,
    };

    this.Input = ({ label, name }) => {
      gid += 1;

      const id = `inp-box-${gid}`;
      return (
        <FormGroup label={label} labelFor={id} requiredLabel={required}>
          <input
            className="pt-input pt-fill"
            type={type}
            id={id}
            value={this.state[name]}
            onChange={this.handleChange(name)}
          />
        </FormGroup>
      );
    }
  }

  handleChange(name) {
    return (e) => {
      this.setState((prev) => ({
        content: {
          ...prevState.content,
          [name]: e.target.value,
        },
      }));
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  }

  ok = () => {
    this.setState({
      visible: false,
    });

    const { content } = this.state;
    this.props.onSuccess(content);
  }

  render() {
    const { onSuccess, title } = this.props;
    const { visible } = this.state;

    return (
      <Overlay
        isOpen={visible}
        onClose={this.hide}
        hasBackdrop={false}
        transitionDuration={0}
      >
        <div className={`${Classes.CARD}`} style={{ paddingTop: '60px' }}>
          <h3>{title}</h3>
          {this.props.children({ Input: this.Input })}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={this.hide}>Cancel</Button>
            <Button
              onClick={onSuccess}
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

InputBox.show = (faachild, props) => {
  createPortal(<InputBox {...props}>{faachild}</InputBox>, el);
}

export default InputBox;
