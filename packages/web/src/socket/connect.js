import Cookie from '../redux/account/cookies';
import client, { getRemoteUrl } from './index';
import store from '../redux';

export default function connect(user) {
  Cookie.set('restro-session', user.token);
  store.dispatch({
    type: 'VERIFIED',
    payload: user.token,
  });

  client.reconnect(getRemoteUrl());
}
