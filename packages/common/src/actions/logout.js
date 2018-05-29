const TYPE = 'LOGOUT';

function logout() {
  return {
    type: TYPE,
  };
}

logout.TYPE = TYPE;

export default logout;
