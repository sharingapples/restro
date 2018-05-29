import schema from 'restro-common/schema';
import db from '../db';

export default async function cancelOrder(tableId, remark) {
  const { session } = this;

  const restro = session.get('restro');

  const table = restro.tables.find(t => t.id === tableId);

  const { activeOrder } = table;

  // No orders to cancel on this table
  if (!activeOrder) {
    return;
  }

  await db.execute(async ({ update }) => {
    // Perform the cancellation
    console.log('Perform update');
    await update('Order', {
      status: 'Cancel',
      remark,
      timestamp: Date.now(),
    }, { id: activeOrder.id });
  });

  // Clear the active order
  table.activeOrder = null;

  console.log('broadcast on', restro.org.id);

  // Update the table
  session.channel(`restro-${restro.org.id}`).dispatch(schema.update('Table', {
    id: table.id,
    number: table.number,
    status: 'Available',
    orderId: null,
    items: [],
  }));
}
