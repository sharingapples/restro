const printer = require('node-thermal-printer');
const config = require('./config.json');
const formatBill = require('./formatBill');
const formatOrder = require('./formatOrder');
const connect = require('shocked-client').default;
const WebSocket = require('ws');

// const printBill = require('./bill');

global.WebSocket = WebSocket;

const client = connect(`ws://localhost:4000/shocked/printer/${config.modes}`);

printer.init(config);

let retyConnect = true;
let retryTimer = null;

function reconnect() {
  if (retryTimer) {
    return;
  }

  retryTimer = setTimeout(() => {
    retryTimer = null;
    client.reconnect();
  }, 1000);
}

client.on('connect', () => {
  retryConnect = true;
  clearTimeout(retryTimer);
  retryTimer = null;
  console.log('Connected');
});

client.on('disconnect', () => {
  console.log('Disconnected');
  if (retryConnect) {
    reconnect();
  }
});


// Listen for bill printing events
client.on('BILL_PRINT', (data) => {
  console.log(data);
  formatBill(printer, data);
  printer.execute((err) => {
    if (err) {
      console.error(err);
    }
  });
});


// List for order printing events
config.modes.split(',').map(m => m.trim().toUppercase()).filter(m => m !== 'BILL').forEach((m) => {
  client.on(`${m}_PRINT`, (data) => {
    formatOrder(printer, data);
    printer.execute((err) => {
      if (err) {
        console.error(err);
      }
    });
  });
});


// const data = {
//   title: 'Fudo Cafe',
//   subTitle: 'Baluwatar',
//   pan: '333-333-333',
//   table: '01',
//   order: 1,
//   date: Date.now(),
//   items: [
//     { name: 'N', rate: 10, qty: 1 },
//     { name: 'Chicken Momo', rate: 220, qty: 18 },
//     { name: 'Black Chimeny (Bottle)', rate: 1650, qty: 20 },
//   ],
//   headerLines: [],
//   discount: 0,
//   serviceCharge: 0,
//   vat: 0,
//   cashier: 'Samip Shrestha'
// };

// formatOrder(printer, data);
// printer.execute((err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Print complete');
//   }
// });

// setTimeout(() => {
//   console.log('Finishing timer');
// }, 2000);
