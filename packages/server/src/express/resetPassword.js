import { reset } from '../auth';

export default async function (req, res) {
  const { token, password } = req.query;
  await reset(token, password);
  res.send('Password reset successful');
}
