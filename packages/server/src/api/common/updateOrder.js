import db from '../../db';

export default function updateOrder(order,condition) {
  console.log(" value in update Order func " , order,condition);
  const { session } = this;
  const userId = session.get('user').id;
  const {serviceCharge,vat} = session.get('restaurant');
  return db.execute(async ({insert,update,deleteAllById}) => {
    const res = deleteAllById(order.tableName,'orderId=?',order.orderId);
    const oldOderUpdateRes = await update('Orders',{status:'pending',timestamp: Date.now(),vat,serviceCharge,userId,tableId: order.tableId},condition);
    return Promise.all(order.items.map(async (item) => {
      const id = await insert('OrderItem', {
        rate: item.price,
        orderId: condition.id,
        menuItemId:item.itemId,
        qty:item.qty,
        // TODO: Include special remarks
      });
        return {
          id,
          orderId,
          itemId: item.itemId,
          qty: item.qty,
        };
    })
);
  });
}