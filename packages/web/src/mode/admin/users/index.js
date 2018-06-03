// @flow
import React from 'react';
import { connect } from 'react-redux';
import schema from 'restro-common/schema';
import { Button, Overlay, Intent, Toaster } from '@blueprintjs/core';

import client from '../../../socket';
import { Consumer } from '../../../App';
import UserForm from './UserForm';

type Props = {
  users: Array<{}>,
}

class Users extends React.Component<Props> {
  state = {
    changeRole: null,
    editId: null,
  }

  componentDidMount() {
    this.getUsers();
  }

  onChangeRole = userId => async (e) => {
    const newRole = e.target.value;
    const admin = await client.scope('Admin');
    await admin.changeRole(userId, newRole);
    this.changeRole(null)();
  }

  onAddUser = () => {
    this.setState({
      editId: -1,
    });
  }

  onDeleteUser = async (id) => {
    const admin = await client.scope('Admin');
    await admin.deleteUser(id);
  }

  getUsers = async () => {
    const admin = await client.scope('Admin');
    await admin.getUsers();
  }

  hideForm = () => {
    this.setState({
      editId: null,
    });
  }

  changeRole = id => () => {
    this.setState({
      changeRole: id,
    });
  }

  deleteUser = (id, name) => () => {
    Toaster.create({

    }).show({
      action: {
        onClick: () => this.onDeleteUser(id),
        text: 'Delete',
      },
      intent: Intent.DANGER,
      message: `Are you sure you want to delete the user ${name}?`,
    });
  }

  render() {
    const { users } = this.props;

    return (
      <Consumer>
        {(app) => {
          app.getTopBar().setTitle('Users');
          app.getTopBar().setActionButton((
            <div>
              <Button onClick={this.onAddUser}>Add</Button>
              <Overlay
                canEscapeKeyClose
                hasBackdrop={false}
                onClose={this.hideForm}
                isOpen={this.state.editId === -1}
              >
                <UserForm record={{}} close={this.hideForm} />
              </Overlay>
            </div>
          ));

          return (
            <div>
              <table className="pt-html-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  { users.map(u => (
                    <tr key={u.id}>
                      <td>{u.email}</td>
                      <td>{u.name}</td>
                      <td>{u.role}</td>
                      <td>
                        <Button className="pt-small" onClick={this.changeRole(u.id)}>Change Role</Button>
                        <Overlay
                          canEscapeKeyClose
                          hasBackdrop={false}
                          onClose={this.changeRole(null)}
                          isOpen={this.state.changeRole === u.id}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flex: 1,
                              flexDirection: 'column',
                              marginTop: '50px',
                              padding: '20px',
                              backgroundColor: 'white',
                            }}
                          >
                            <h3>{`Change ${u.name}'s Role`}</h3>
                            <div className="pt-select pt-fill">
                              <select className="pt-fill" defaultValue={u.role} onChange={this.onChangeRole(u.id)}>
                                <option value="Waiter">Waiter</option>
                                <option value="Cashier">Cashier</option>
                                <option value="Admin">Admin</option>
                              </select>
                            </div>
                          </div>
                        </Overlay>
                        <Button intent={Intent.DANGER} className="pt-small" onClick={this.deleteUser(u.id, u.name)} icon="trash" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

const mapStateToProps = ({ database }) => ({
  users: schema.all(database.User),
});

export default connect(mapStateToProps)(Users);
