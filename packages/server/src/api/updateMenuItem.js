import schema from 'restro-common/schema';
import db from '../db';

export default async function updateMenuItem(menuItem) {
  const { session } = this;
  const restro = session.get('restro');

  const mItem = await db.execute(async ({ insert, update, findOne }) => {
    if (!menuItem.id) {
      const id = await insert('MenuItem', menuItem);
      return findOne('MenuItem', id);
    }

    await update('MenuItem', menuItem, { id: menuItem.id });
    return findOne('MenuItem', menuItem.id);
  });

  const channel = session.channel(`restro-${restro.org.id}`);

  if (menuItem.id) {
    // Add/Update the items in the cache
    restro.menuItems = restro.menuItems.map(m => (m.id === mItem.id ? mItem : m));
    channel.dispatch(schema.update('MenuItem', mItem));
  } else {
    restro.menuItems.push(mItem);
    channel.dispatch(schema.add('MenuItem', mItem));
  }

  session.channel(`restro-${restro.id}`)
    .dispatch(schema.init('MenuItem', restro.menuItems));
}
