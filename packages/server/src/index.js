import express from 'express';
import http from 'http';
import start from 'shocked';
import run from 'app-node';

import { switchRestro } from './api';

import { init as initDb } from './db';
import authExpress from './express';

import { validateToken } from './auth';

const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

console.log(`Starting server at port ${port}`);

run(async (nodeApp) => {
  const url = '/shocked/:origin/:token';

  // Make sure the database is initialized
  await initDb();

  const socket = start({ server, url }, async (session) => {
    const { origin, token } = session.params;

    if (origin === 'web') {
      try {
        const user = validateToken(token);
        session.set('user', user);

        // Switch Restro
        await switchRestro.call({ session }, user.restros[0].id);

        // dispatch login
        session.dispatch({ type: 'LOGIN', payload: user });
        return true;
      } catch (err) {
        // console.error(err);
        session.dispatch({ type: 'LOGOUT' });
        session.emit('logout');
        return false;
      }
    } else if (origin === 'printer') {
      const types = token.split('%7C');
      types.forEach((t) => {
        session.subscribe(`${t}_PRINTER`);
      });
      return true;
    }

    return false;
  });

  // Setup authentication route
  authExpress(app);

  // Start listening for http reuqest
  server.listen(port);

  // Setup exit
  nodeApp.addExitHandler(() => {
    socket.stop();
    server.close();
  });
});
