import schema from 'restro-common/schema';
import db from '../db';
import printer from './printer';

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
      vat: restro.org.vat,
      serviceCharge: restro.org.serviceCharge,
      status: 'Complete',
      timestamp: Date.now(),
      userId: user.id,
    }, { id: activeOrder.id });
  });

  table.activeOrder = null;

  const discount = activeOrder.discount || 0;
  const orderTotal = activeOrder.items.reduce((a, i) => a + (i.qty * i.rate), 0) - discount;
  const serviceCharge = orderTotal * restro.org.serviceCharge;
  const vat = (orderTotal + serviceCharge) * restro.org.vat;

  // Broadcast for printing
  printer.queue('BILL', {
    title: restro.org.name,
    subTitle: restro.org.subTitle,
    pan: restro.org.pan,
    table: table.number,
    order: activeOrder.id,
    serviceCharge,
    vat,
    cashier: user.name,
    discount: activeOrder.discount || 0,
    items: activeOrder.items.map(itm => ({
      ...itm,
      // eslint-disable-next-line eqeqeq
      name: restro.menuItems.find(m => m.id == itm.menuItemId).name,
    })),
  });

  // Update the table
  session.channel(`restro-${restro.org.id}`).dispatch(schema.update('Table', {
    id: table.id,
    number: table.number,
    status: 'Available',
    orderId: null,
    items: [],
  }));
}
