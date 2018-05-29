import { reset } from '../auth';

export default async function resetPassword(req, res) {
  const { token, password } = req.query;
  try {
    await reset(token, password);
    res.send('Password reset successful');
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err.message);
  }
}
