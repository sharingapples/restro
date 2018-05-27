import { createScope } from 'shocked';
import switchRestro from './switchRestro';

import placeOrder from './placeOrder';

const admin = createScope('Admin', () => {

});

const waiter = createScope('Waiter', () => {
  // TODO: Make sure the session belongs to a waiter
});

waiter(placeOrder);


const cashier = createScope('Cashier', () => {

});

export {
  admin,
  waiter,
  cashier,

  switchRestro,
};
