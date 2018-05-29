import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Elevation, ControlGroup, Button, Intent } from '@blueprintjs/core';
import axios from 'axios';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.updateEmail = this.update('email');
  }

  state = {
    email: '',
    error: '',
    busy: false,
    complete: false,
  }

  onForgot = async () => {
    const { email } = this.state;
    this.setState({ busy: true });
    try {
      await axios.get(`/auth/forgot?username=${email}`);
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
    const { busy, complete, email, error } = this.state;
    if (complete) {
      return (
        <div className="pt-non-ideal-state">
          <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
            <span className="pt-icon pt-icon-home" />
          </div>
          <h4 className="pt-non-ideal-state-title">Email Sent</h4>
          <div className="pt-non-ideal-state-description">
            Please check your email for further instruction to reset
            your password.
          </div>
        </div>
      );
    }

    return (
      <Card elevation={Elevation.TWO} style={{ width: '100%', maxWidth: '400px' }}>
        <h3>Forgot Password</h3>
        <p style={{ color: 'red' }}>{error}&nbsp;</p>
        <ControlGroup fill vertical>
          <input type="text" className="pt-input pt-large" placeholder="Email" value={email} onChange={this.updateEmail} disabled={busy} />
          <Button onClick={this.onForgot} className="pt-large" intent={Intent.PRIMARY} disabled={busy}>Forgot</Button>
        </ControlGroup>
        <br />
        <div style={{ textAlign: 'right' }}>
          <Link to="/">Back to Login</Link>
        </div>
      </Card>
    );
  }
}

export default ForgotPassword;
