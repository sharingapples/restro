var printer = require("node-thermal-printer");
module.exports = function billPrint(data) {

console.log(data);

  printer.init({
    type: 'epson',
    interface: '/dev/usb/lp0',
    width: 40,
  });



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

printFullLine('=');

printer.drawLine();

printer.table(["one", "two", "three"]);
printer.table(["one", "two", "three"]);
printer.table(["one", "two", "three"]);
printer.table(["one", "two", "three"]);

printer.println("one two three four fie");
printer.println("onekjfklasjdfkaljsdflkas jflasdf");

printRow(data.itemHeaders);
data.menuItems.map(item => printRow(data.itemHeaders, item));


printer.cut();
printer.execute(err => {
    if (err) {
      console.error("Print failed", err);
    } else {

     console.log("Print done");
    }
} );

}
