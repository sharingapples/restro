const moment = require('moment');

module.exports = function formatOrder(printer, data) {
  const width = 33;
  const fullLine = new Array(width).fill('-');

  printer.setTextDoubleHeight();
  // printer.setTextDoubleWidth();
  printer.alignCenter();
  printer.println(data.title);
  printer.println(`Table # ${data.table}`);
  printer.println(`${moment(data.date).format('YYYY-MM-DD HH:mm')}`);

  data.items.forEach((item, idx) => printer.tableCustom([
    { text: idx + 1, align: 'LEFT', width: (3 / width) },
    { text: item.name, align: 'LEFT', width: (26 / width) },
    { text: item.qty, align: 'RIGHT', width: (4 / width) },
  ]));
  printer.cut();
};
