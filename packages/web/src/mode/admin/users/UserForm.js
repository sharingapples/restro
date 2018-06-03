import React from 'react';
import { InputGroup, Label, Button, Intent } from '@blueprintjs/core';

import client from '../../../socket';

type Props = {
  close: () => {},
  record: {
    id: string,
    name: string,
    email: string,
    role: string,
  }
}

class UserForm extends React.Component<Props> {
  static defaultProps = {
    record: {},
  };

  constructor(props) {
    super(props);

    this.updateName = this.update('name');
    this.updateEmail = this.update('email');
    this.updateRole = this.update('role');
  }

  state = {
    id: this.props.record.id,
    name: this.props.record.name,
    email: this.props.record.email,
    role: this.props.record.role || 'Waiter',
  }

  onSave = async () => {
    const admin = await client.scope('Admin');
    try {
      await admin.addUser(this.state);
      this.props.close();
    } catch (err) {
      console.error(err);
    }
  }

  update(name) {
    return (e) => {
      this.setState({
        [name]: e.target.value,
      });
    };
  }

  render() {
    const { name, email, role } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
           backgroundColor: 'white',
            marginTop: '50px',
            padding: '20px',
          }}
      >
        <div style={{ backgroundColor: 'white', maxWidth: '400px' }}>
          <Label text="Email">
            <InputGroup type="text" name="email" value={email} onChange={this.updateEmail} />
          </Label>
          <Label text="Name">
            <InputGroup type="text" name="name" value={name} onChange={this.updateName} />
          </Label>
          <Label text="Role">
            <div className="pt-select">
              <select name="itemId" onChange={this.updateRole} defaultValue={role}>
                <option value="Waiter">Waiter</option>
                <option value="Cashier">Cashier</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </Label>
        </div>
        <div>
          <Button onClick={this.onSave} intent={Intent.PRIMARY}>Save</Button>
        </div>
      </div>
    );
  }
}

export default UserForm;
