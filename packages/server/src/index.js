import start from 'redsock';

import { validateToken } from './auth';

start({ port: 8080, url: '/:origin/:token' }, (session) => {
  // Check if its a valid user
  const user = validateToken(session.params.token);
  session.set('user', user);

  // Based on the type of the user, join specific channels

});
