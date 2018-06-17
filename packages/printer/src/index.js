const printer = require('node-thermal-printer');
const config = require('../config.json');
const formatBill = require('./formatBill');
const formatOrder = require('./formatOrder');
const connect = require('shocked-client').default;
const createNetwork = require('shocked-network-node').default;
const WebSocket = require('ws');

const network = createNetwork({ domain: 'restro.net' });

const client = connect(
  `${config.server}/shocked/printer/${config.modes}`,
  null,
  WebSocket,
  network
);

printer.init(config);

network.on('online', () => {
  // Perform a reconnect as soon as we get a online signal
  client.reconnect();
});

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
  client.on(`${m}_PRINT`, async (data, serial) => {
    if (m === 'BILL') {
      formatBill(printer, data);
    } else {
      formatOrder(printer, data);
    }

    try {
      await print();
      client.call('Printer', 'printed', m, serial);
    } catch (err) {
      console.error(err);
    }
  });
});
