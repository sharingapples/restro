// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Elevation, ControlGroup, Button, Intent } from '@blueprintjs/core';
import axios from 'axios';

type Props = {
  match: {
    params: {
      token: string,
    }
  }
}

class ResetPassword extends Component<Props> {
  constructor(props) {
    super(props);

    this.updateNewP = this.update('newP');
    this.updateConfirmP = this.update('confirmP');
  }

  state = {
    newP: '',
    confirmP: '',
    error: '',
    busy: false,
    complete: false,
  };

  onReset = async () => {
    const { newP } = this.state;
    const { token } = this.props.match.params;

    try {
      await axios.get(`/auth/reset?token=${token}&password=${newP}`);
      this.setState({ complete: true });
    } catch (err) {
      this.setState({
        busy: false,
        error: err.message,
      });
    }
  }

  update = name => (e) => {
    this.setState({
      [name]: e.target.value,
      error: '',
    });
  }

  render() {
    const {
      newP, confirmP, busy, error, complete,
    } = this.state;
    if (complete) {
      return (
        <div className="pt-non-ideal-state">
          <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
            <span className="pt-icon pt-icon-unlock" />
          </div>
          <h4 className="pt-non-ideal-state-title">Password reset successful</h4>
          <div className="pt-non-ideal-state-description">
            You can now proceeed to <Link to="/">login</Link> with your new password.
          </div>
          <Link to="/">Login</Link>
        </div>
      );
    }
    const disabled = busy || !newP || newP !== confirmP;
    return (
      <Card elevation={Elevation.TWO} style={{ width: '100%', maxWidth: '400px' }}>
        <h3>Reset Password</h3>
        <p style={{ color: 'red' }}>{error}&nbsp;</p>
        <ControlGroup fill vertical>
          <input type="password" className="pt-input pt-large" placeholder="New Password" value={newP} onChange={this.updateNewP} disabled={busy} />
          <input type="password" className="pt-input pt-large" placeholder="Confirm Password" value={confirmP} onChange={this.updateConfirmP} disabled={busy} />
          <Button onClick={this.onReset} className="pt-large" intent={Intent.PRIMARY} disabled={disabled}>Reset Password</Button>
        </ControlGroup>
        <br />
        <div style={{ textAlign: 'right' }}>
          <Link to="/">Back to Login</Link>
        </div>
      </Card>
    );
  }
}

export default ResetPassword;
