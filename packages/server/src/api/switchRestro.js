import schema from 'restro-common/schema';

import { restro } from '../cache';

export default async function switchRestro(id) {
  const { session } = this;
  const user = session.get('user');

  const userRestro = user.restros.find(r => r.id === id);
  if (userRestro === null) {
    throw new Error('Invalid restro id', id);
  }

  // TODO: Unsubsribe from previously selected restaurant

  // Switch to the given restro
  session.dispatch({ type: 'SWITCH_RESTRO', payload: id });

  // Provide all the restaurant details
  let r = null;
  try {
    r = await restro.get(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
  session.set('restro', r);

  session.dispatch(schema.init('Category', r.categories));
  session.dispatch(schema.init('Item', r.items));
  session.dispatch(schema.init('MenuItem', r.menuItems));
  session.dispatch(schema.init('Table', r.tables.map(t => ({
    id: t.id,
    number: t.number,
    status: t.activeOrder ? 'Active' : 'Available',
    orderId: t.activeOrder ? t.activeOrder.id : null,
    items: t.activeOrder ? t.activeOrder.items : [],
  }))));

  // Subscribe to changes for basic information of this restaurant
  session.subscribe(`restro-${id}`);
}
