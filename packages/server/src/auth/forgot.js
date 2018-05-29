import uuid from 'uuid/v4';
import db from '../db';
import cache from '../cache';
import mailer from '../mailer';

const RESET_TOKEN_AGE = 1 * 60 * 60 * 1000; // 1 hour

const domain = process.env.RESTRO_DOMAIN || 'https://restro.net/';

export default async function forgot(username) {
  // First get the user email from database
  const user = await db.execute(({ findOne }) => findOne('User', { username }));

  if (!user) {
    throw new Error('Unknown username');
  }

  const resetToken = uuid();
  // console.log('Reset Token is', resetToken);

  // Include a reset token on cache
  cache.users.set(resetToken, user.id, RESET_TOKEN_AGE);

  // console.log('Send reset email to', user);

  // Send an email with a link to reset the password
  mailer({
    from: 'Restro.net <noreply@restro.net>',
    to: user.username,
    subject: 'Password reset',
    text: `Please use the following link to reset your password ${domain}/reset/${resetToken}`,
  });
}
