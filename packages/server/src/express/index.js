import express from 'express';
import path from 'path';

import login from './login';
import resetPassword from './resetPassword';
import forgotPassword from './forgotPassword';

export default function (app) {
  // Force to https
  app.use((req, res, next) => {
    const proto = req.get('X-Forwarded-Proto');
    if (proto && proto !== 'https') {
      res.redirect(301, `https://${req.get('Host')}${req.url}`);
    } else {
      next();
    }
  });

  app.get('/auth/login', login);
  app.get('/auth/reset', resetPassword);
  app.get('/auth/forgot', forgotPassword);

  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.get('/table/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
  });
}
