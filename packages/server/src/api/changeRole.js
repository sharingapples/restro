import schema from 'restro-common/schema';
import db from '../db';

export default async function changeRole(userId, newRole) {
  const { session } = this;
  const restro = session.get('restro');

  const id = await db.execute(async ({ findOne, update }) => {
    // Find restro user id
    const r = await findOne('RestroUser', { restroId: restro.org.id, userId });

    if (!r) {
      throw new Error('Invalid User');
    }

    await update('RestroUser', { role: newRole }, { id: r.id });
    return r.id;
  });

  // Dispatch the update request
  session.dispatch(schema.update('User', { id, role: newRole }));
}
