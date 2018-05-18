import cache from '../cache';

export default function validateToken(token) {
  const user = cache.users.get(token);
  if (!user) {
    throw new Error('Invalid token');
  }

  return user;
}
