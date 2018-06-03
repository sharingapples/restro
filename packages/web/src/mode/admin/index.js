import React, { Component } from 'react';
import { Tabs, Tab } from '@blueprintjs/core';

import client from '../../socket';

import TopBar from '../../components/TopBar';

import Users from './users';
import Tables from './tables';
import Items from './items';
import MenuItems from './menu-items';


// eslint-disable-next-line react/prefer-stateless-function
class Admin extends Component {
  componentDidMount() {
    // Iniitialize the admin scope
    client.scope('Admin');
  }

  render() {
    return (
      <div>
        <TopBar />
        <Tabs id="admintabs" renderActiveTabPanelOnly>
          <Tab id="users" title="Users" panel={<Users />} />
          <Tab id="tables" title="Tables" panel={<Tables />} />
          <Tab id="items" title="Items" panel={<Items />} />
          <Tab id="menuItems" title="Menu" panel={<MenuItems />} />
        </Tabs>
      </div>
    );
  }
}

export default Admin;
