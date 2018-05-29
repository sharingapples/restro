// @flow
import React, { Component } from 'react';
import { FormGroup, Classes, Button, Intent } from '@blueprintjs/core';

import client from '../../socket';

type Props = {
  onClose: () => {},
};

class ChangePassword extends Component<Props> {
  state = {
    oldP: '',
    newP: '',
    confirmP: '',
    error: '',
  };


  onChange = async () => {
    const { oldP, newP } = this.state;
    const scope = await client.scope('General');
    try {
      await scope.changePassword(oldP, newP);
      this.props.onClose();
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  handleChange = name => (e) => {
    this.setState({
      [name]: e.target.value,
      error: '',
    });
  }

  render() {
    const { onClose } = this.props;
    const { oldP, newP, confirmP, error } = this.state;

    return (
      <div className={`${Classes.CARD}`} style={{ paddingTop: '60px' }}>
        <h3>Change Password</h3>
        <p style={{ color: 'red', textAlign: 'center' }}>&nbsp;{error}&nbsp;</p>
        <FormGroup label="Old Password" labelFor="old-password" requiredLabel>
          <input className="pt-input pt-fill" type="password" id="old-password" value={oldP} onChange={this.handleChange('oldP')} />
        </FormGroup>
        <FormGroup label="New Password" labelFor="new-password" requiredLabel>
          <input className="pt-input pt-fill" type="password" id="new-password" value={newP} onChange={this.handleChange('newP')} />
        </FormGroup>
        <FormGroup label="Confirm Password" labelFor="confirm-password" requiredLabel>
          <input className="pt-input pt-fill" type="password" id="confirm-password" value={confirmP} onChange={this.handleChange('confirmP')} />
        </FormGroup>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={this.onChange}
            disabled={!(oldP && newP && newP === confirmP)}
            intent={Intent.PRIMARY}
          >
            Change
          </Button>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
