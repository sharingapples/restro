import schema from 'restro-common/schema';
import db from '../db';
import printer from './printer';

export default async function placeOrder(tableId, items) {
  const { session } = this;
  const userId = session.get('user').id;
  const restro = session.get('restro');

  const table = restro.tables.find(t => t.id === tableId);


  const orderItems = await db.execute(async ({ insert }) => {
    const { activeOrder } = table;

    if (!activeOrder) {
      table.activeOrder = {
        id: await insert('Order', {
          tableId,
          status: 'Active',
          discount: 0,
          vat: restro.org.vat,
          serviceCharge: restro.org.serviceCharge,
        }),
        items: [],
      };
    }

    return Promise.all(items.map(async (item) => {
      // eslint-disable-next-line eqeqeq
      const menuItem = restro.menuItems.find(m => m.id == item.id);
      const rate = menuItem.price;

      const id = await insert('OrderItem', {
        userId,
        orderId: table.activeOrder.id,
        menuItemId: item.id,
        qty: item.qty,
        rate,
      });

      return {
        id,
        userId,
        orderId: table.activeOrder.id,
        menuItemId: item.id,
        qty: item.qty,
        rate,
      };
    }));
  });

  // Add all the additional items
  table.activeOrder.items.push(...orderItems);

  // Segregate items by category
  const seggregated = orderItems.reduce((res, orderItem) => {
    // eslint-disable-next-line eqeqeq
    const menuItem = restro.menuItems.find(m => m.id == orderItem.menuItemId);
    // eslint-disable-next-line eqeqeq
    const item = restro.items.find(i => i.id == menuItem.itemId);

    if (!res[item.categoryId]) {
      res[item.categoryId] = [orderItem];
    } else {
      res[item.categoryId].push(orderItem);
    }
    return res;
  }, {});

  // Emit for printing of the respective type
  Object.keys(seggregated).forEach((id) => {
    // eslint-disable-next-line eqeqeq
    const category = restro.categories.find(c => c.id == id);
    const type = category.name.toUpperCase();
    printer.queue(type, {
      title: `${type}_ORDER`,
      table: table.number,
      date: Date.now(),
      items: seggregated[id].map(item => ({
        // eslint-disable-next-line eqeqeq
        name: restro.menuItems.find(m => m.id == item.menuItemId).name,
        qty: item.qty,
      })),
    });
  });

  // Update the table
  session.channel(`restro-${restro.org.id}`).dispatch(schema.update('Table', {
    id: table.id,
    number: table.number,
    status: table.activeOrder ? 'Active' : 'Available',
    orderId: table.activeOrder ? table.activeOrder.id : null,
    items: table.activeOrder ? table.activeOrder.items : [],
  }));


  // Also dispatch to all the listeners to the table
  // session.channel(`Table-${tableId}`).dispatch({
  //   type: 'NEW_ORDER',
  //   payload: orderItems,
  // });
}
