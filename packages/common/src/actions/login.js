const TYPE = 'LOGIN';

function login(user) {
  return ({
    type: TYPE,
    payload: user,
  });
}

login.TYPE = TYPE;
export default login;
