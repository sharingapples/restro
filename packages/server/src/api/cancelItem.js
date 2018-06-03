import schema from 'restro-common/schema';
import db from '../db';

export default async function cancelItem(tableId, itemId) {
  const { session } = this;

  const restro = session.get('restro');
  const table = restro.tables.find(t => t.id === tableId);

  const { activeOrder } = table;

  // No orders to cancel on this table
  if (!activeOrder) {
    return;
  }

  // Check if the itemId belongs to the active Order
  const idx = activeOrder.items.findIndex(item => item.id === itemId);
  if (idx === -1) {
    throw new Error('Invalid item id.');
  }

  await db.execute(async (instance) => {
    await instance.delete('OrderItem', { id: itemId });
  });

  // Remove from cache
  activeOrder.items.splice(idx, 1);

  // Broadcast to all
  session.channel(`restro-${restro.org.id}`).dispatch(schema.update('Table', {
    id: table.id,
    number: table.number,
    status: 'Active',
    orderId: activeOrder.id,
    items: table.activeOrder.items,
  }));
}
