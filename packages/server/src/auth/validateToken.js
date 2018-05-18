export default function validateToken(authId) {
  if (!authId) {
    throw new Error('Invalid authentication token');
  }

  return {
    id: 'tmp',
    name: 'Temp User',
  };
}
