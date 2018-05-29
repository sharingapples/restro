import React, { Component } from 'react';
import { Card, Elevation, Button, Intent, ControlGroup } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

import connect from '../../socket/connect';

class Login extends Component {
  constructor(props) {
    super(props);

    this.updateEmail = this.update.bind(this, 'email');
    this.updatePassword = this.update.bind(this, 'password');
  }

  state = {
    email: process.env.REACT_APP_DEV_USER,
    password: process.env.REACT_APP_DEV_PASSWORD,
    busy: false,
    error: '',
  };

  onLogin = async () => {
    const { email, password, busy } = this.state;
    if (!busy && (email && password)) {
      this.setState({ busy: true });
      try {
        const resp = await axios.get(`/auth/login?username=${email}&password=${password}`);
        this.setState({ busy: false });
        connect(resp.data);
      } catch (err) {
        this.setState({
          busy: false,
          error: 'Invalid username/password',
        });
      }
    }
  }

  update(item, e) {
    this.setState({
      [item]: e.target.value,
      error: '',
    });
  }

  render() {
    const { email, password, busy, error } = this.state;

    return (
      <Card elevation={Elevation.TWO} style={{ width: '100%', maxWidth: '400px' }}>
        <h3>Login</h3>
        <p style={{ color: 'red' }}>{error}&nbsp;</p>
        <ControlGroup fill vertical>
          <input type="text" className="pt-input pt-large" placeholder="Email" value={email} onChange={this.updateEmail} disabled={busy} />
          <input type="password" className="pt-input pt-large" placeholder="Password" value={password} onChange={this.updatePassword} disabled={busy} />
          <Button onClick={this.onLogin} className="pt-large" intent={Intent.PRIMARY} disabled={busy}>Login</Button>
        </ControlGroup>
        <br />
        <div style={{ textAlign: 'right' }}>
          <Link to="/forgot">Forgot Password</Link>
        </div>
      </Card>
    );
  }
}

export default Login;
