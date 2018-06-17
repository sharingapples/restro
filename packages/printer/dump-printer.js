/**
 * A test printer that listens at port 9001 and dumps
 * whatever it receives
 */
const net = require('net');

const port = parseInt(process.argv[2] || 9000, 10);

const server = net.createServer();

server.listen(port, () => {
  console.log('Dump Printer started at port', port);
});

server.on('connection', (socket) => {
  console.log('Printer connection');
  socket.on('data', (data) => {
    console.log('RX', data);
  });
});
