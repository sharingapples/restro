import { connect } from 'shocked-client';
import getRemoteUrl from './getRemoteUrl';
import store from '../redux';

const client = connect(getRemoteUrl() : null, store);


let retryConnect = true;
let retryTimer = null;

client.on('connect', () => {
  retryConnect = true;
  store.dispatch({
    type: 'CONNECT',
  });
});

function reconnect() {
  if (retryTimer) {
    return;
  }

  retryTimer = setTimeout(() => {
    retryTimer = null;
    client.reconnect();
  }, 1000);
}

client.on('disconnect', () => {
  store.dispatch({
    type: 'DISCONNECT',
  });

  // Try to establish a connection after a timeout
  if (retryConnect) {
    reconnect();
  }
});

client.on('logout', () => {
  retryConnect = false;
});

client.on('error', (err) => {
  console.error(err);
});

export { getRemoteUrl };

export default client;

