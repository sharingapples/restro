import { login } from '../auth';

export default async function (req, res) {
  const { username, password } = req.query;
  try {
    const user = await login(username, password);
    res.send(JSON.stringify(user));
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err.message);
  }
}
