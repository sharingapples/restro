import express from 'express';
import http from 'http';
import axios from 'axios';
import appExpress from '../src/express';
import addUser from '../src/api/admin/addUser';
import addItem from '../src/api/admin/addItem';
import addMenuItem from '../src/api/admin/addMenuItem';
import addTable from '../src/api/admin/addTable';


const app = express();
const server = http.createServer(app);

appExpress(app);
const port = 5001;
server.listen(port);


describe('It checks the server for authentication api', () => {
  it('checks for valid login', async () => {
    const res = await axios.get(`http://localhost:${port}/auth/login?username=bhagyasah4u@gmail.com&password=Admin123*`);
    console.log(res.data);
    expect(res.data).toMatchObject({
      username: 'bhagyasah4u@gmail.com',
    });
    expect(res.data.token).toHaveLength(36);
  });

  it('checks for invalid login', async () => {

  });

  it('checks for forget password and reset password', async () => {
    const res = await axios.get(`http://localhost:${port}/auth/forgot?username=bhagyasah4u@gmail.com`);
    console.log(res.data);

  });
});



