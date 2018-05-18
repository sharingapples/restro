import cache from '../cache';

export default async function validateToken(token) {
  const user = cache.users.get(token);
  if (!user) {
    throw new Error('Invalid token');
  }

  return user;
}
