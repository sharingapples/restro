const printer = require('node-thermal-printer');

const config = require('./config.json');

module.exports = function billPrint(data) {
  printer.init(config);

  function printRow(headers, row = null) {
    printer.tableCustom(headers.map(header => ({
      text: row ? row[header.id] : header.text,
      width: header.width,
      align: header.align,
      bold: !row,
    })));
  }

  printer.setTextDoubleHeight();
  printer.println(data.title);
  printer.setTextNormal();
  data.headerLines.forEach((line) => {
    printer.alignCenter();
    printer.println(line);
  });

  printer.alignLeft();
  printRow(data.headers);
  data.items.map(item => printRow(data.headers, item));

  data.footerLines.forEach((line) => {
    printer.alignCenter();
    printer.println(line);
  });

  printer.cut();
  printer.execute((err) => {
    if (err) {
      console.error('Print failed', err);
    } else {
      console.log('Print done');
    }
  });
};
