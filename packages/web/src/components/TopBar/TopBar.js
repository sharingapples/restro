import React, { Component } from 'react';
import { Navbar, Alignment } from '@blueprintjs/core';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import store from '../../redux';

import { Consumer } from '../../App';

class TopBar extends Component {
  state = {
    title: 'Restro.NET',
    button: null,
  }

  onLogout = () => {
    console.log('Clicked');
    store.dispatch({ type: 'LOGOUT' });
  }


  setTitle = (title) => {
    this.setState({ title });
  }

  setActionButton = (button) => {
    this.setState({ button });
  }


  render() {
    const { user } = this.props;
    const { title, button } = this.state;

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
                <div>{ user }</div>
              </Navbar.Group>
            </Navbar>
          );
        }}
      </Consumer>
    );
  }
}

const mapStateToProps = ({ ui, account }) => ({
  title: ui.title || 'Restro.NET',
  user: account.user.name,
});

export default connect(mapStateToProps)(TopBar);
