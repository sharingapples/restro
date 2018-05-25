
let express = require('express');
let  socket = require('socket.io');
let printer = require('./printer');

// App setup
let app = express();
let server = app.listen(9001,() => {
  printer({orderId:1});
  console.log('listening for requests on port 9001');
});

//Socket setup

let io = socket(server);

io.on('connection',(socket)=> {
  console.log('made socket connectio ',socket.id);
  // Handle Print event
  socket.on('billPrint', (data) => {
   printer({orderId: 1});
  });
});


