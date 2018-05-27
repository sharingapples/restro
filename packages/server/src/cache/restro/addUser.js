import db from '../../db';
import { forgot } from '../../auth';

async function createUser(insert, email, name) {
  await insert('User', {
    username: email,
    name,
  });

  // Send a password forgot email
  forgot(email);
}

export default async function addUser(restro, adminId, email, name, role) {
  // Check if a user with the given email already exists
  await db.execute(async ({ findOne, insert }) => {
    const user = await findOne('User', { username: email });
    const userId = (user && user.id) || await createUser(insert, email, name);

    // If the user is already associated with the restro, just update the role
    const restroUser = await findOne('RestroUser', { restroId: restro.id, userId });
    if (!restroUser) {
      const id = await insert('RestroUser', { restroId: restro.id, userId, role });
      return {
        id,
        userId,
        email,
        name,
        role,
      };
    }

    return {
      id: restroUser.id,
      userId: restroUser.userId,
      role: restroUser.role,
      email: user.email,
      name: user.name,
    };
  });
}
