import db from '../db';
import cache from '../cache';
import { hash } from './password';

export default async function resetPassword(resetToken, newPassword) {
  const userId = cache.users.get(resetToken);
  if (!userId) {
    throw new Error('Invalid token');
  }

  const password = hash(newPassword);
  await db.execute(({ update }) => update('users', { password }, { id: userId }));

  // Clear the token once used
  cache.users.del(resetToken);
}
