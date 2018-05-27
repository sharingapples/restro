import uuid from 'uuid/v4';

import db from '../db';
import cache from '../cache';
import { check } from './_password';

const SESSION_AGE = 7 * 86400 * 1000; // Session duration of 1 week

export default async function login(username, password) {
  return db.execute(async ({ findOne, query }) => {
    const record = await findOne('User', { username });

    // Check if the passowrd is correct
    if (!record || !check(password, record.password)) {
      throw new Error('Invalid username/password');
    }

    // Create a user object to respond with
    const token = uuid();
    const user = {
      id: record.id,
      username,
      name: record.name,
      token,
    };

    // Retrieve all the restros accesible to this user
    const restros = await query(
      `SELECT Restro.id, Restro.name, Restro.vat, Restro.serviceCharge, RestroUser.role FROM Restro
        INNER JOIN RestroUser
          ON RestroUser.restroId = Restro.id AND RestroUser.userId=?`,
      record.id
    );
    user.restros = restros;

    // Set the user cache with the database record
    cache.users.set(token, user, SESSION_AGE);

    return user;
  });
}
