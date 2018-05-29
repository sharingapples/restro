import { changePassword as dbChangePassword } from '../auth';

export default async function changePassword(oldPassword, newPassword) {
  const { session } = this;
  const user = session.get('user');

  return dbChangePassword(user.id, oldPassword, newPassword);
}
