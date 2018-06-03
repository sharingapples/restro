import schema from 'restro-common/schema';
import db from '../db';

export default async function updateItem(item) {
  const { session } = this;
  const restro = session.get('restro');

  const mItem = await db.execute(async ({ insert, update, findOne }) => {
    if (!item.id) {
      const id = await insert('Item', item);
      return findOne('Item', id);
    }

    await update('Item', item, { id: item.id });
    return findOne('Item', item.id);
  });

  const channel = session.channel(`restro-${restro.org.id}`);

  if (item.id) {
    // Add/Update the items in the cache
    restro.items = restro.items.map(m => (m.id === mItem.id ? mItem : m));
    channel.dispatch(schema.update('Item', mItem));
  } else {
    const withStock = {
      ...mItem,
      stock: 0,
    };
    restro.items.push(withStock);
    channel.dispatch(schema.add('Item', withStock));
  }
}
