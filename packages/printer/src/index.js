const connect = require('shocked-client').default;
const WebSocket = require('ws');

const printBill = require('./bill');

global.WebSocket = WebSocket;

const client = connect('ws://192.168.1.112:4000/shocked/printer/bill');

console.log(client);

client.on('connect', () => {
  console.log('Connected');
});

client.on('BILL_PRINT', (data) => {
  console.log(data);
  printBill({
    title: data.title,
    headers: [
      { id: 'sn', text: 'SN', width: 0.1, align: 'CENTER' },
      { id: 'item', text: 'Particulars', width: 0.5, align: 'LEFT' },
      { id: 'rate', text: 'Rate', width: 0.15, align: 'RIGHT' },
      { id: 'qty', text: 'Qty', width: 0.1, align: 'CENTER' },
      { id: 'amount', text: 'Amt', width: 0.15, align: 'RIGHT' },
    ],
    items: data.items.map((item, idx) => ({
      sn: idx + 1,
      item: item.name,
      rate: item.rate,
      qty: item.qty,
      amount: item.rate * item.qty,
    })),
  });
});

setTimeout(() => {
  console.log('Finishing timer');
}, 2000);
