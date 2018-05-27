const printer = require("node-thermal-printer");

const config = require('./config.json');

module.exports = function billPrint(data) {
  printer.init(config);

  function printRow(headers, data = null) {
    console.log("data in function print row",data,headers);
    printer.tableCustom(headers.map((header) => ({
      text: data ? data[header.id] : header.text,
      width: header.width,
      align: header.align,
      bold: data ? false : true,
    })))
  }

  function printFullLine(char) {
    const size = printer.getWidth();
    console.log(size);
    let str = '';
    for(let i=0; i < size; i += 1) {
      str += char;
    }
    printer.println(str);
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
  printer.execute(err => {
    if (err) {
      console.error("Print failed", err);
    } else {

    console.log("Print done");
    }
  });
}