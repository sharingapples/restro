let Printer = require("node-thermal-printer");

module.exports = function printBill(data){

// function printRow(headers, data = null) {
//   Printer.tableCustom(headers.map((header) => ({
//     text: data ? data[header.id] : header.title,
//     width: header.width,
//     align: header.align || "left",
//     bold: data ? false : true,
//   })))
// }

// function printFullLine(char) {
//   Printer.table()
//   const size = Printer.getWidth();
//   let str = '';
//   for(let i=0; i < size; i += 1) {
//     str += char;
//   }
//   Printer.println(str);
// }

console.log(data);

  Printer.init({
    type: 'epson',
    interface: '/dev/usb/lp0'
  });
  //console.log(Printer.isPrinterConnected());
  Printer.alignCenter();
  Printer.setTextNormal();
  Printer.setTextDoubleHeight();
  Printer.println(data.title);
  Printer.drawLine();
 // Printer.println("********************************");
  Printer.setTextNormal();
  Printer.println(data.subTitle);
  data.headerLines.map(item => {
          Printer.table([item.left,item.center,item.right]);
  });

  Printer.alignCenter();
  Printer.drawLine();
  Printer.newLine();
  //Printer.println("********************************");

  //printRow(data.itemHeaders);
 // Printer.getWidth()

  //data.menuItems.map(item => printRow(data.itemHeaders, item));

  Printer.tableCustom(data.itemHeaders.map(item => {
    return {
      text:item.text,align: item.align,width: item.width,bold:true
    }
  }
  ));
  Printer.drawLine();
  Printer.setTextNormal();
  data.menuItems.map((item,idx) => {
    Printer.tableCustom([
      {text: idx +1,width:0.1, align:"center"},
      {text: item.itemName,width: 0.6,align: "center"},
      {text: item.qty,width: 0.1,align:"center"},
      {text: item.price, width:0.2,align:"center"}
    ])
  })
  Printer.drawLine();
  data.footerLines.map(item => {
    Printer.table([item.left,item.center,item.right]);
});
  Printer.cut();
  Printer.execute(err => {
      if (err) {
        console.error("Print failed", err);
      } else {

       console.log("Print done");
      }
  });
}
