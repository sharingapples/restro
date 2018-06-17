import { createScope } from 'shocked';
import switchRestro from './switchRestro';

import changePassword from './changePassword';
import logout from './logout';

import placeOrder from './placeOrder';
import cancelOrder from './cancelOrder';
import printOrder from './printOrder';
import cancelItem from './cancelItem';

import addUser from './addUser';
import getUsers from './getUsers';
import deleteUser from './deleteUser';
import changeRole from './changeRole';
import updateMenuItem from './updateMenuItem';
import updateTable from './updateTable';
import updateItem from './updateItem';
import getOrders from './getOrders';

import { printed } from './printer';

const general = createScope('General', () => {

});
general(logout);
general(changePassword);

const admin = createScope('Admin', (session) => {
  // Make sure its an admin
  const user = session.get('user');
  if (user.role !== 'Admin') {
    // TODO: throw new Error(`Access Denied to Admin for role ${user.role}`);
  }

  const restro = session.get('restro');
  session.subscribe(`restro-${restro.id}/admin`);
});

admin(getUsers);
admin(changeRole);
admin(updateItem);
admin(updateMenuItem);
admin(updateTable);
admin(addUser);
admin(deleteUser);
admin(getOrders);
// admin(changePassword);

const waiter = createScope('Waiter', () => {
  // TODO: Make sure the session belongs to a waiter
});

waiter(placeOrder);

const cashier = createScope('Cashier', () => {

});

cashier(cancelOrder);
cashier(printOrder);
cashier(cancelItem);

function ping() {
  return 'pong';
}

const printer = createScope('Printer', () => {

});
printer(printed);
printer(ping);

// eslint-disable-next-line import/prefer-default-export
export { switchRestro };
