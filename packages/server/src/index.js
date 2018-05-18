import express from 'express';
import http from 'http';
import start from 'redsock';

import authExpress from './express';

import { validateToken } from './auth';

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// // Start the websocket server
// start({ server, url: '/redsock/:origin/:token' }, (session) => {
//   // Check if its a valid user
//   const user = validateToken(session.params.token);
//   session.set('user', user);

//   // Based on the type of the user, join specific channels
// });

// Register all http routes required by the app
authExpress(app);

// Start the http server
server.listen(port);
