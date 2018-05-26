import printBill from '../../print-server/src/printer';

describe('printer test', () => {
  it('billprint test', async() => {
  const res = printBill({title: "fudo Cafe"});
    console.log('priter test function called');
  });
});