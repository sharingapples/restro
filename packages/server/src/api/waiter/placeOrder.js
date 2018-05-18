import db from '../../db';

export default function placeOrder(tableId, items) {
  const { session } = this;
  const userId = session.get('user').id;
  const cache = session.get('cache');

  const orderItems = await db.execute(async ({ insert, findOne }) => {
    // insert the record into orders table
    return await Promise.all(items.map(async (item) => {
      // Search for an active order for the given table, or create one if none exists
      const orderId = await findOne('orders', { complete: false, tableId }) ||
        await insert('orders', { tableId });

      const id = insert('orderItems', {
        userId: session.get('user').id,
        orderId,
        itemId: item.id,
        qty: item.qty,
        // TODO: Include special remarks
      });

      return {
        id,
        orderId,
        itemId: item.id,
        qty: item.qty,
      };
    }));
  });

  // Segregate items by type
  const seggregated = orderItems.map((orderItem) => cache.items[orderItem.id]).reduce((res, item) => {
    res[item.type].push(orderItem);
    return res;
  }, {});

  // Emit for printing of the respective type
  Object.keys(seggregated).forEach((type) => {
    session.channel(type).emit('NEW_ORDER', seggregated[type]);
  });

  // Also dispatch to all the listeners to the table
  session.channel(`Table-${tableId}`).dispatch({
    type: 'NEW_ORDER',
    payload: orderItems,
  });
}
