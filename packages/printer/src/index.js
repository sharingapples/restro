const moment = require('moment');
const printer = require('node-thermal-printer');
const config = require('../config.json');
const formatBill = require('./formatBill');
const formatOrder = require('./formatOrder');
const connect = require('shocked-client').default;
// const createNetwork = require('shocked-network-node').default;
const WebSocket = require('ws');

// const network = createNetwork({ domain: 'restro.net' });

const client = connect(
  `${config.server}/shocked/printer/${config.modes}`,
  null,
  WebSocket
);

let isConnected = false;
client.on('connect', () => {
  isConnected = true;
});

// Add a heart beat to run every 3 seconds to make sure we are connected
setInterval(async () => {
  if (!isConnected) {
    // Close the client connection and try to reconnect
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'), 'Client is not connected. Retry.');
    client.reconnect();
    return;
  }

  // Reset the flag, before pinging
  isConnected = false;
  if (client.isConnected()) {
    try {
      const p = await client.scope('Printer');
      await p.ping();
      isConnected = true;
    } catch (err) {
      // Ignore error
    }
  }
}, 3000);

printer.init(config);

// network.on('online', () => {
//   console.log('Connecting at', moment().format('HH:mm:ss'));
//   // Perform a reconnect as soon as we get a online signal
//   client.reconnect();
// });

// network.on('offline', () => {
//   console.log('Got offline at', moment().format('HH:mm:ss'));
// });

async function print() {
  return new Promise((resolve, reject) => {
    const buf = printer.getBuffer();
    printer.clear();
    printer.raw(buf, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

// List for order printing events
config.modes.split('|').map(m => m.trim()).forEach((m) => {
  client.on(`${m}_PRINT`, async ({ data, serial }) => {
    if (m === 'BILL') {
      formatBill(printer, data);
    } else {
      formatOrder(printer, data);
    }

    try {
      await print();

      const s = await client.scope('Printer');
      s.printed(m, serial);
      // client.rpc('Printer', 'printed', m, serial);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
});
