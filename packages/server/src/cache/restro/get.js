import restros from './_cache';
import db from '../../db';

import placeOrder from './placeOrder';

export default async function get(id) {
  const res = restros.get(id);
  if (res) {
    return res;
  }

  const restro = await db.execute(async ({ findOne, find, query }) => {
    const org = await findOne('Restro', { id });
    // Get all the users for the given restro
    const users = await find('RestroUser', { restroId: id });

    // Get all the Categories
    const categories = await find('Category', { restroId: id });

    // Get all the Items
    const items = await query('SELECT * FROM Item WHERE categoryId IN (SELECT id FROM category WHERE restroId=?)', id);
    // Also append menuItems for all items
    const menuItems = [];

    // Update stock for each item
    await Promise.all(items.map(async (item) => {
      const stocks = await query('SELECT * FROM ItemStock WHERE itemId=? ORDER BY timestamp DESC LIMIT 1', item.id);
      let stock = stocks.length > 0 ? stocks[0].stock : 0;
      const timestamp = stocks.length > 0 ? stocks[0].timestamp : 0;

      // Add all purchases since the stock was made
      const purchases = await query('SELECT SUM(qty) AS total FROM Purchase WHERE ItemId=? AND timestamp >= ?', item.id, timestamp);
      stock += purchases[0].total;

      // Remove all the orders since the stock was made
      const orders = await query(
        `SELECT SUM(OrderItem.qty * MenuItem.qty) AS total FROM OrderItem
           INNER JOIN [MenuItem] ON [MenuItem].id=OrderItem.menuItemId
           INNER JOIN [Order] ON [Order].id=OrderItem.orderId
         WHERE MenuItem.itemId=?
           AND [Order].status='Complete'
           AND [Order].timestamp > ?`,
        item.id, timestamp
      );
      stock -= orders[0].total;

      const menu = await find('MenuItem', { itemId: item.id });
      menuItems.push(...menu);

      // eslint-disable-next-line no-param-reassign
      item.stock = stock;
    }));

    // Get all the tables
    const tables = await find('Table', { restroId: id });
    await Promise.all(tables.map(async (table) => {
      const orders = await query(
        `SELECT OrderItem.* FROM OrderItem
           INNER JOIN [Order] ON [Order].id=OrderItem.orderId
           WHERE [Order].tableId=?
             AND [Order].status='Active'`,
        table.id
      );

      const activeOrder = orders.length > 0 ? { id: orders[0].orderId, items: orders } : null;

      // eslint-disable-next-line no-param-reassign
      table.activeOrder = activeOrder;
    }));

    const r = {
      org,
      users,
      categories,
      items,
      menuItems,
      tables,

      placeOrder: placeOrder.bind(null, r),
    };

    console.log('Restro is', r.org);
    return r;
  });

  console.log('Setting up cache with restro', restro.org);
  // Setup the cache
  restros.set(id, restro);

  return restro;
}
