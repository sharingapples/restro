import placeOrder from '../src/api/common/placeOrder';
import updateOrder from '../src/api/common/updateOrder';
import cancelOrder from '../src/api/common/cancelOrder';


const SESSION_DATA = {
  user: { id: 1, name: 'Bhagya Testing' },
  restaurant: {id:1,name: 'Fudo Cafe',serviceCharge: 0.1,vat: 0.13}
}

const sessionObj = {
  session:{  get: key => SESSION_DATA[key],}
  };

describe('Test for all order events', () => {

  it('test for placeOrder', async() => {
    const res = await placeOrder.call(sessionObj,{tableId: 1,items:[{itemId:1,qty: 5,price: 120,restaurantId:1},
      {itemId:3,qty: 2,price: 120,restaurantId:1},{itemId:4,qty: 3,price: 120,restaurantId:1}]});
    console.log('placeorder result', res);
  });

  it('test for update Order',async () => {
    const res = updateOrder.call(sessionObj,{tableId:1,items:[{itemId:1,qty: 5,price: 120,restaurantId:1},
      {itemId:3,qty: 2,price: 120,restaurantId:1},{itemId:4,qty: 3,price: 120,restaurantId:1}]},{id: 1 });
    console.log('update order result',res);
  });

  it('test for cancel order', async() => {
    const res = await cancelOrder.call(sessionObj,{id:1});
    console.log('cancel order result', res);
  })
});