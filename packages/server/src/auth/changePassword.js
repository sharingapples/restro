import db from '../db';

import { check } from './_password';

export default async function changePassword(userId, oldPassword, newPassword) {
  return db.execute(async ({ update, findOne }) => {
    const record = await findOne('User', { id: userId });
    if (!record || !check(oldPassword, record.password)) {
      throw new Error('Invalid password');
    }

    // Change the password
    await update('User', { password: newPassword }, { id: userId });
  });
}
