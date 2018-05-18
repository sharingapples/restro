import uuid from 'uuid/v4';

import db from '../db';
import cache from '../cache';
import { check } from './_password';

const SESSION_AGE = 7 * 86400 * 1000; // Session duration of 1 week

export default async function login(username, password) {
  return db.execute(async ({ findOne }) => {
    const record = await findOne('users', { username });

    // Check if the passowrd is correct
    if (!record || !check(password, record.password)) {
      throw new Error('Invalid username/password');
    }

    // Create a user object to respond with
    const token = uuid();
    const user = {
      username,
      name: record.name,
      role: record.role,
      token,
    };

    // Set the user cache with the database record
    cache.users.set(token, record, SESSION_AGE);

    return user;
  });
}
