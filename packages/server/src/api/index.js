import { createScope } from 'shocked';
import switchRestro from './switchRestro';

import changePassword from './changePassword';
import logout from './logout';

import placeOrder from './placeOrder';
import cancelOrder from './cancelOrder';
import printOrder from './printOrder';
import cancelItem from './cancelItem';

const general = createScope('General', () => {

});
general(logout);
general(changePassword);

// const admin = createScope('Admin', () => {

// });
// admin(logout);
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

// eslint-disable-next-line import/prefer-default-export
export { switchRestro };
