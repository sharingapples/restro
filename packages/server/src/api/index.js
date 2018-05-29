import { createScope } from 'shocked';
import switchRestro from './switchRestro';

import logout from './logout';
import placeOrder from './placeOrder';
import cancelOrder from './cancelOrder';
import printOrder from './printOrder';

const admin = createScope('Admin', () => {

});
admin(logout);

const waiter = createScope('Waiter', () => {
  // TODO: Make sure the session belongs to a waiter
});

waiter(placeOrder);
waiter(logout);

const cashier = createScope('Cashier', () => {

});

cashier(cancelOrder);
cashier(printOrder);
cashier(logout);

export {
  admin,
  waiter,
  cashier,

  switchRestro,
};
