import path from 'path';
import sqlite from 'sqlite';

import upsert from '../upsert';
import find from '../find';

async function upgrade() {
  const newDb = await sqlite.open('restro.sqlite', { Promise });

  // Run migrations on new Db
  await newDb.migrate({ migrationsPath: path.resolve(__dirname, '..', 'migrations') });

  const oldDb = await sqlite.open('restro.sqlite.db', { Promise });

  // First the categories
  const categories = await find(oldDb, 'ItemType');
  await Promise.all(categories.map(cat => upsert(newDb, 'Category', { restroId: 1, ...cat })));
  console.log(`Upgraded ItemType => Category ${categories.length}`);

  const items = await find(oldDb, 'Item');
  await Promise.all(items.map((item) => {
    upsert(newDb, 'Item', {
      id: item.id,
      name: item.name,
      unit: item.unit,
      categoryId: item.itemTypeId,
      threshold: item.threshold,
    });
    return true;
  }));
  console.log(`Upgraded Item => Item ${items.length}`);

  const menuItems = await find(oldDb, 'MenuItem');
  await Promise.all(menuItems.map((menuItem) => {
    if (menuItem.itemId === null) {
      console.log(`Invalid menuItem ${menuItem.id}/${menuItem.name}/Type ${menuItem.itemTypeId}`);
      return false;
    }
    upsert(newDb, 'MenuItem', {
      id: menuItem.id,
      itemId: menuItem.itemId,
      name: menuItem.name,
      qty: menuItem.qty,
      price: menuItem.price,
    });
    return true;
  }));
  console.log(`Upgraded MenuItem => MenuItem ${menuItems.length}`);
}

upgrade();
