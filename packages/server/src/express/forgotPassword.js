import { forgot } from '../auth';

export default async function (req, res) {
  const { username } = req.query;
  await forgot(username);
  res.send('Check your email address for further information');
}
