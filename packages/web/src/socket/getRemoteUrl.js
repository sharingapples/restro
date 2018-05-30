/* global window */
import store from '../redux';

const protocol = process.env.REACT_APP_SOCKET_PROTOCOL || (window.location.protocol === 'https:' ? 'wss' : 'ws');
const host = process.env.REACT_APP_SOCKET_HOST || window.location.hostname;
const port = process.env.REACT_APP_SOCKET_PORT || window.location.port;

export default function getRemoteUrl() {
  const { sessionId } = store.getState().account;
  if (!sessionId) {
    return null;
  }

  return `${protocol}://${host}:${port}/shocked/web/${sessionId}`;
}
