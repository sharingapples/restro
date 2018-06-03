import schema from 'restro-common/schema';
import db from '../db';

export default async function addUser(record) {
  const { session } = this;
  const restro = session.get('restro');

  const res = await db.execute(async ({ insert, findOne }) => {
    const user = await findOne('User', { username: record.email });
    let userId = null;
    if (!user) {
      userId = await insert('User', {
        username: record.email,
        password: 'NOT SET',
        name: record.name,
        type: 'Restro',
      });
    } else {
      userId = user.id;
    }

    const id = await insert('RestroUser', { userId, restroId: restro.org.id, role: record.role });
    return {
      id: userId,
      name: record.name,
      email: record.email,
      role: record.role,
      restroUserId: id,
    };
  });

  session.dispatch(schema.add('User', res));
}

