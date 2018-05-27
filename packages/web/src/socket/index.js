import { connect } from 'shocked-client';
import getRemoteUrl from './getRemoteUrl';
import store from '../redux';

const client = connect(getRemoteUrl() : null, store);

client.on('connect', () => {
  store.dispatch({
    type: 'CONNECT',
  });
});

client.on('disconnect', () => {
  store.dispatch({
    type: 'DISCONNECT',
  });
});

client.on('error', (err) => {
  console.error(err);
});

export { getRemoteUrl };

export default client;

