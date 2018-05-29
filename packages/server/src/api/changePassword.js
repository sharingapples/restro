import dbChangePassword from '../auth';

export default async function changePassword(oldPassword, newPassword) {
  const { session } = this;
  const user = session.get('user');

  await dbChangePassword(user.id, oldPassword, newPassword);
}
