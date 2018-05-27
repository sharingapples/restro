import db from '../../db';

async function createOrder(restro, insert, tableId) {
  const obj = {
    tableId,
    status: 'Active',
    vat: restro.vat,
    serviceCharge: restro.serviceCharge,
    discount: 0,
  };

  const id = await insert('Order', obj);
  obj.id = id;
  obj.items = [];
  return obj;
}

export default function placeOrder(restro, waiterId, tableId, items) {
  return db.execute(async ({ insert }) => {
    const table = restro.tables[tableId];

    // If the table already has an active order, include the items on that
    const activeOrder = table.activeOrder || await createOrder(restro, insert, tableId);

    // Insert all the items
    activeOrder.items.push(...await Promise.all(items.map(async (item) => {
      const obj = {
        userId: waiterId,
        menuItemId: item.menuItemId,
        qty: item.qty,
        rate: item.rate, // Should this be taken from cache instead
      };
      const id = await insert('OrderItem', obj);
      obj.id = id;
      return obj;
    })));

    return table;
  });
}
