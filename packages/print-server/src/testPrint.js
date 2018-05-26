let printBill = require('./billPrint');

printBill({
  title: 'FUDO CAFE',
  subTitle: 'Adress of restaurant',
  headerLines:[{left:'leftText',right:'rightText',center: 'centerText',fill: '='}],
  itemHeaders:[{id: 'sn',name: 'sn',text:'S.N',width:0.1,align:'left'},
              {id:'particular',name: 'particular',text:'Particular',width:0.5,align:'left'},
              {id:'qty',name: 'qty',text:'Qty',width:0.1,align:'left'},
              {id:'price',name: 'price',text:'Price',width:0.3,align:'RIGHT'}
            ],
  menuItems:[{sn: 1, particular: 'momo',qty:1,price:120},
        {sn: 2, particular: 'Chaumin',qty:3,price:140},
        {sn: 3, particular: 'Buff Momo',qty:2,price:220},
        {sn: 4, particular: 'Chicken Momo',qty:1,price:120}
      ],
   footerLines:[{ fill: '=' }, {left:'VAT',center:' ',right:'13%'},
              {left:'ServiceCharge',center:' ',right:'10%'},,
              {left:'Total',center:' ',right:'1200',fill:'='}
            ]
});