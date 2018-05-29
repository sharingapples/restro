import * as actions from 'restro-common/actions';

import cache from '../cache';

export default function logout() {
  const { session } = this;
  const user = session.get('user');

  cache.users.del(user.token);

  session.dispatch(actions.logout());

  // close the session on logout
  session.close();
}
