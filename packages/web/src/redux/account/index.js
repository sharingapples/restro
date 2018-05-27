import Cookie from './cookies';

const INITIAL_STATE = {
  sessionId: Cookie.get('restro-session'),
  online: false,
  user: null,
};

console.log('Initial State', INITIAL_STATE);

const reducer = () => (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'VERIFIED':
      console.log('Verified', action);
      return {
        ...state,
        sessionId: action.payload,
        user: null,
      };

    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        sessionId: null,
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
}

export { reducer };
