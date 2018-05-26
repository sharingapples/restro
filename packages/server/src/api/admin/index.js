import { createScope } from 'redsock';
import reconcile from './reconcile';

const admin = createScope('Admin' , (session) => {
if(session.get('RestaurantUser').role !== 'Admin'){
  throw new Error('Invalid scope access');

}
});
admin(reconcile);