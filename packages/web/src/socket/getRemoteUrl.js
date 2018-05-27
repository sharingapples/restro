/* global window */
import store from '../redux';

export default function getRemoteUrl() {
  const { sessionId } = store.getState().account;
  console.log('SessionId', sessionId, store.getState());
  if (!sessionId) {
    return null;
  }

  return `${process.env.REACT_APP_SOCKET_PROTOCOL}://${process.env.REACT_APP_SOCKET_HOST || window.location.hostname}:${process.env.REACT_APP_SOCKET_PORT}/shocked/web/${sessionId}`;
}
