import db from '../db';
import cache from '../cache';
import { hash } from './_password';

export default async function resetPassword(resetToken, newPassword) {
  const userId = cache.users.get(resetToken);
  console.log('Reset Password for', userId, newPassword);

  if (!userId) {
    throw new Error('Invalid token');
  }

  const password = hash(newPassword);
  console.log('Hashed password', password);

  await db.execute(({ update }) => update('User', { password }, { id: userId }));

  // Clear the token once used
  cache.users.del(resetToken);
}
