import { login, logout } from 'restro-common/actions';

import Cookie from './cookies';

const INITIAL_STATE = {
  sessionId: Cookie.get('restro-session'),
  online: false,
  user: null,
  restroId: null,
  restros: [],
};

const reducer = () => (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'VERIFIED':
      return {
        ...state,
        sessionId: action.payload,
        user: null,
      };

    case login.TYPE:
      return {
        ...state,
        user: action.payload,
        restros: action.payload.restros,
      };

    case logout.TYPE:
      return {
        ...state,
        user: null,
        sessionId: null,
        restros: [],
      };

    case 'SWITCH_RESTRO':
      return {
        ...state,
        restroId: action.payload,
      };

    case 'CONNECT':
      return {
        ...state,
        online: true,
      };

    case 'DISCONNECT':
      return {
        ...state,
        online: false,
      };

    default:
      return state;
  }
};

// eslint-disable-next-line
export { reducer };
