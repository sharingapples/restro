import db from '../../db';
import cache from '../../cache';
import { toUnicode } from 'punycode';

export default async function placeOrder(order) {
  const { session } = this;
  const userId = session.get('user').id;
  const {serviceCharge,vat} = session.get('restaurant');
  const orderItems=  await db.execute(async ({ insert, findOne }) => {
     // Search for an active order for the given table, or create one if none exists
    const orderId = await findOne('Orders',{complete: 0, tableId:3}).id || await insert('Orders', { tableId: order.tableId,userId, timestamp: Date.now(),
      status:'pending',discount: 0,serviceCharge,vat,remark: 'jpt',complete:false});

      return Promise.all(order.items.map(async (item) => {
        const id = await insert('OrderItem', {
          rate: item.price,
          orderId,
          menuItemId:item.itemId,
          qty:item.qty,
          // TODO: Include special remarks
        });
          return {
            id,
            orderId,
            itemId: item.itemId,
            qty: item.qty,
          };
      })
  );
});
return orderItems;
  // // Segregate items by type
  // const seggregated = orderItems.map(orderItem => cache.items.get(orderItem.id).reduce((res, item) => {
  //   res[item.type].push(orderItem);
  //   return res;
  // }, {}));

  // // Emit for printing of the respective type
  // Object.keys(seggregated).forEach((type) => {
  //   session.channel(type).emit('NEW_ORDER', seggregated[type]);
  // });

  // // Also dispatch to all the listeners to the table
  // session.channel(`Table-${tableId}`).dispatch({
  //   type: 'NEW_ORDER',
  //   payload: orderItems,
  // });
}
