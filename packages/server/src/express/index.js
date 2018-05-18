import login from './login';
import resetPassword from './resetPassword';
import forgotPassword from './forgotPassword';

export default function (app) {
  app.get('/auth/login', login);
  app.get('/auth/reset', resetPassword);
  app.get('/auth/forgot', forgotPassword);
}
