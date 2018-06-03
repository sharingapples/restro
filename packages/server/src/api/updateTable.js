import schema from 'restro-common/schema';
import db from '../db';

export default async function updateTable(record) {
  const { session } = this;
  const restro = session.get('restro');

  const id = await db.execute(async ({ insert, update }) => {
    if (record.id) {
      await update('Table', { number: record.number }, { id: record.id });
      return record.id;
    }
    return insert('Table', {
      number: record.number,
      restroId: restro.org.id,
    });
  });

  const channel = session.channel(`restro-${restro.org.id}`);
  // Update the cache
  if (record.id) {
    const tbl = restro.tables.find(t => t.id === record.id);
    tbl.number = record.number;
    channel.dispatch(schema.update('Table', {
      id: tbl.id,
      number: record.number,
    }));
  } else {
    const obj = {
      id,
      number: record.number,
      activeOrder: null,
    };

    restro.tables.push(obj);
    channel.dispatch(schema.add('Table', {
      id,
      number: record.number,
      status: 'Available',
      orderId: null,
      items: [],
    }));
  }
}
