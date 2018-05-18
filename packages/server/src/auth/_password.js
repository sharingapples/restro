import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function hash(password) {
  bcrypt.hashSync(password, SALT_ROUNDS);
}

export function check(password, hashed) {
  return bcrypt.compareSync(password, hashed);
}
