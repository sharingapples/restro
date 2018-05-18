import express from 'express';
import http from 'http';
import start from 'redsock';

import { validateToken } from './auth';

const app = express();
const server = http.createServer(app);

// Start the websocket server
start({ server, url: '/redsock/:origin/:token' }, (session) => {
  // Check if its a valid user
  const user = validateToken(session.params.token);
  session.set('user', user);

  // Based on the type of the user, join specific channels

});

// Start the http server
server.listen(8080);
