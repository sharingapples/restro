import schema from 'restro-common/schema';
import db from '../db';
import printer from './printer';

export default async function printOrder(tableId, discount = 0, addServiceCharge = true, remark = '') {
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
      remark,
    }, { id: activeOrder.id });
  });

  table.activeOrder = null;

  const orderTotal = activeOrder.items.reduce((a, i) => a + (i.qty * i.rate), 0) - discount;
  const serviceCharge = addServiceCharge ? (orderTotal * restro.org.serviceCharge) : 0;
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
    discount,
    items: activeOrder.items.map(itm => ({
      ...itm,
      // eslint-disable-next-line eqeqeq
      name: restro.menuItems.find(m => m.id == itm.menuItemId).name,
    })),
    remark,
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
