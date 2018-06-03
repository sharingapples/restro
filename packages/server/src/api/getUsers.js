import schema from 'restro-common/schema';
import db from '../db';

export default async function getUsers() {
  const { session } = this;
  const restro = session.get('restro');
  const me = session.get('user');

  const allButMe = await db.execute(async ({ find, findOne }) => {
    const users = await find('RestroUser', { restroId: restro.org.id });

    return Promise.all(users.filter(u => u.userId !== me.id).map(async (u) => {
      const user = await findOne('User', { id: u.userId });
      return {
        id: user.id,
        restroUserId: u.id,
        name: user.name,
        email: user.username,
        role: u.role,
      };
    }));
  });

  // Dispatch the result
  session.dispatch(schema.init('User', allButMe));
}
