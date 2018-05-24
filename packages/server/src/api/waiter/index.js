import { createScope } from 'redsock';
import placeOrder from './placeOrder';

const waiter = createScope('Waiter', (session) => {
  if (session.get('user').role !== 'Waiter') {
    throw new Error('Invalid scope access');
  }
});

waiter(placeOrder);

