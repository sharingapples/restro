import schema from 'restro-common/schema';

import db from '../db';

export default async function deleteUser(userId) {
  const { session } = this;
  const restro = session.get('restro');

  await db.execute(async (instance) => {
    await instance.delete('RestroUser', { restroId: restro.org.id, userId });
  });

  session.dispatch(schema.remove('User', {
    id: userId,
  }));
}
