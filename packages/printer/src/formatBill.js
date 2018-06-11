const moment = require('moment');
const numeral = require('numeral');

const PARTICULAR_WIDTH = 13;

module.exports = function formatBill(printer, data) {
  const width = 33;
  const fullLine = new Array(width).fill('-').join('');


  printer.setTypeFontB();

  printer.setTextDoubleHeight();
  printer.alignCenter();
  printer.println(data.title);

  printer.setTextNormal();
  printer.alignCenter();
  printer.println(data.subTitle);

  printer.leftRight(`Date: ${moment(data.date).format('YYYY-MM-DD hh:mm')}`, `Table# ${data.table}`);
  printer.leftRight(`PAN: ${data.pan}`, `Bill# ${data.order}`);

  printer.println(' ');

  printer.bold(true);
  printer.tableCustom([
    { text: 'SN', align: 'LEFT', width: (3 / width) },
    { text: 'Items', align: 'LEFT', width: (13 / width) },
    { text: 'Rate', align: 'RIGHT', width: (6 / width) },
    { text: 'Qty', align: 'RIGHT', width: (4 / width) },
    { text: 'Amt', align: 'RIGHT', width: (7 / width) },
  ]);
  printer.bold(false);
  printer.println(fullLine);
  data.items.forEach((item, idx) => {
    printer.tableCustom([
      { text: idx + 1, align: 'LEFT', width: (3 / width) },
      { text: item.name.substr(0, PARTICULAR_WIDTH), align: 'LEFT', width: (13 / width) },
      { text: numeral(item.rate).format('#,##0'), align: 'RIGHT', width: (6 / width) },
      { text: numeral(item.qty).format('#,##0'), align: 'RIGHT', width: (4 / width) },
      { text: numeral(item.rate * item.qty).format('#,##0'), align: 'RIGHT', width: (7 / width) },
    ]);
  });

  const subTotal = data.items.reduce((res, item) => res + (item.qty * item.rate), 0);

  printer.println(fullLine);
  printer.alignRight();

  printer.println(`Sub Total: ${numeral(subTotal).format('#,##0.00')}`);
  printer.println(`Discount: ${numeral(data.discount).format('#,##0.00')}`);
  printer.println(`Service Charge: ${numeral(data.serviceCharge).format('#,##0.00')}`);
  printer.println(`Total ${numeral((subTotal - data.discount) + data.serviceCharge).format('#,##0.00')}`);
  printer.println(`VAT: ${numeral(data.vat).format('#,##0.00')}`);
  printer.bold(true);
  printer.println(`Grand Total: ${numeral((subTotal - data.discount) + data.serviceCharge + data.vat).format('#,##0.00')}`);
  printer.bold(false);
  printer.alignLeft();
  printer.println(' ');
  printer.println(`Cashier: ${data.cashier}`);
  printer.println(' ');
  printer.println(' ');
  printer.println(' ');
  printer.println(' ');
  printer.println(' ');
  printer.println(' ');
};
