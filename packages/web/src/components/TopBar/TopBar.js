/* global window */
// @flow
import React, { Component } from 'react';
import { Navbar, Alignment, Popover, Menu, MenuItem, MenuDivider, Overlay } from '@blueprintjs/core';
import { connect } from 'react-redux';
import logo from '../../logo.svg';

import client from '../../socket';
import { Consumer } from '../../App';

import ChangePassword from '../ChangePassword';

type Props = {
  userName: string,
};

class TopBar extends Component<Props> {
  state = {
    title: 'Restro.NET',
    button: null,
    showChangePassword: false,
  }

  setTitle = (title) => {
    this.setState({ title });
  }

  setActionButton = (button) => {
    this.setState({ button });
  }

  logout = async () => {
    const scope = await client.scope('General');
    await scope.logout();

    // Move to the home location
    window.location.href = '/';
  }

  changePassword = () => {
    this.setState({ showChangePassword: true });
  }

  hideChangePassword = () => {
    this.setState({ showChangePassword: false });
  }

  render() {
    const { userName } = this.props;
    const { title, button, showChangePassword } = this.state;

    return (
      <Consumer>
        {(app) => {
          app.registerTopBar(this);
          return (
            <Navbar fixedToTop className="pt-dark">
              <Navbar.Group align={Alignment.LEFT}>
                <img src={logo} style={{ height: '40px' }} alt="logo" />
                <Navbar.Divider />
                <Navbar.Heading>{title}</Navbar.Heading>
                { button }
              </Navbar.Group>
              <Navbar.Group align={Alignment.RIGHT}>
                <Popover>
                  <div>{ userName }</div>
                  <Menu>
                    <MenuItem text="Change Password" onClick={this.changePassword} />
                    <MenuDivider />
                    <MenuItem text="Logout" onClick={this.logout} />
                  </Menu>
                </Popover>
                <Overlay
                  isOpen={showChangePassword}
                  onClose={this.hideChangePassword}
                  hasBackdrop={false}
                  transitionDuration={0}
                >
                  <ChangePassword onClose={this.hideChangePassword} />
                </Overlay>
              </Navbar.Group>
            </Navbar>
          );
        }}
      </Consumer>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  userName: account.user.name,
});

export default connect(mapStateToProps)(TopBar);
