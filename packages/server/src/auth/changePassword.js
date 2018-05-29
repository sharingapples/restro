import db from '../db';

import { check, hash } from './_password';

export default async function changePassword(userId, oldPassword, newPassword) {
  return db.execute(async ({ update, findOne }) => {
    const record = await findOne('User', { id: userId });
    if (!record || !check(oldPassword, record.password)) {
      throw new Error('Invalid password');
    }

    const password = hash(newPassword);
    // Change the password
    await update('User', { password }, { id: userId });
  });
}
