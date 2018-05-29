import schema from 'restro-common/schema';
import db from '../db';

export default async function printOrder(tableId) {
  const { session } = this;

  const user = await session.get('user');
  const restro = session.get('restro');

  const table = restro.tables.find(t => t.id === tableId);
  const { activeOrder } = table;

  if (!activeOrder) {
    return;
  }

  await db.execute(async ({ update }) => {
    await update('Order', {
      status: 'Complete',
      timestamp: Date.now(),
      userId: user.id,
    }, { id: activeOrder.id });
  });

  table.activeOrder = null;
  console.log('Broadcast print');

  try {
    // Broadcast for printing
    session.channel('BILL_PRINTER').emit('BILL_PRINT', {
      restro: restro.org.name,
      tableNumber: table.number,
      orderId: activeOrder.orderId,
      vat: activeOrder.vat,
      serviceCharge: activeOrder.serviceCharge,
      discount: activeOrder.discount,
      items: activeOrder.items.map(itm => ({
        ...itm,
        // eslint-disable-next-line eqeqeq
        name: restro.menuItems.find(m => m.id == itm.menuItemId).name,
      })),
    });
  } catch (err) {
    console.error(err);
  }

  // Update the table
  session.channel(`restro-${restro.org.id}`).dispatch(schema.update('Table', {
    id: table.id,
    number: table.number,
    status: 'Available',
    orderId: null,
    items: [],
  }));
}
