module.exports = function formatBill(printer, data) {
  const width = 40;
  const fullLine = new Array(width).fill('-');

  printer.setTextDoubleHeight();
  printer.alignCenter();
  printer.println(data.title);

  printer.alignCenter();
  printer.println(data.subTitle);

  printer.leftRight(`Date: ${data.date}`, `PAN# ${data.pan}`);

  printer.println();

  printer.bold(true);
  printer.tableCustom([
    { text: 'SN', align: 'LEFT', width: (3 / width) },
    { text: 'Items', align: 'LEFT', width: (20 / width) },
    { text: 'Rate', align: 'RIGHT', width: (6 / width) },
    { text: 'Qty', align: 'CENTER', width: (5 / width) },
    { text: 'Amt', align: 'RIGHT', width: (6 / width) },
  ]);
  printer.bold(false);
  data.println(fullLine);
  data.items.forEach((item, idx) => ([
    { text: idx + 1, align: 'LEFT', width: (3 / width) },
    { text: item.name, align: 'LEFT', width: (20 / width) },
    { text: item.rate, align: 'RIGHT', width: (6 / width) },
    { text: item.qty, align: 'CENTER', width: (5 / width) },
    { text: item.rate * item.qty, align: 'RIGHT', width: (6 / width) },
  ]));

  const subTotal = data.items.reduce((res, item) => res + (item.qty * item.rate), 0);

  data.println(fullLine);
  printer.alignRight();

  printer.println(`Sub Total: ${subTotal}`);
  printer.println(`Discount: ${data.discount}`);
  printer.println(`Service Charge: ${data.serviceCharge}`);
  printer.println(`Total ${(subTotal - data.discount) + data.serviceCharge}`);
  printer.println(`VAT: ${data.vat}`);
  printer.bold(true);
  printer.println(`Grand Total: ${(subTotal - data.discount) + data.serviceCharge + data.vat}`);
  printer.bold(false);
  printer.alignLeft();
  printer.println(`Cashier: ${data.cashier}`);
};
