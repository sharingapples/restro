import { connect } from 'shocked-client';
import getRemoteUrl from './getRemoteUrl';
import store from '../redux';

const client = connect(getRemoteUrl() : null, store);

client.on('connect', () => {
  store.dispatch({
    type: 'CONNECT',
  });
});


let retryTimer = null;
function retryConnect() {
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
  retryConnect();
});

client.on('error', (err) => {
  console.error(err);
});

export { getRemoteUrl };

export default client;

