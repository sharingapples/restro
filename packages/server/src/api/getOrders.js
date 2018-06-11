import db from '../db';

export default async function getOrders() {
  const { session } = this;

  const restro = session.get('restro');

  const items = await db.execute(async ({ query }) => {
    // Retrieve order for the last 14 days
    const sql = `SELECT
        [Order].id, [Order].status, [Order].timestamp, [Order].discount, [Order].vat, [Order].serviceCharge, [Order].remark,
        [Table].number,
        [OrderItem].menuItemId, [OrderItem].qty, [OrderItem].rate
      FROM [Order]
      INNER JOIN [Table] ON [Table].id=[Order].tableId
      INNER JOIN [OrderItem] ON [OrderItem].orderId=[Order].id
      WHERE [Table].restroId = ? AND [Order].timestamp > ?
      ORDER BY [Order].timestamp DESC`;
    const timestamp = Math.floor(Date.now() - (7 * 86400 * 1000));
    const res = await query(sql, restro.org.id, timestamp);
    return res;
  });

  // Group all the items by Order Id
  const orders = items.reduce((res, order) => {
    const r = res[order.id];
    const amt = order.rate * order.qty;

    if (!r) {
      res[order.id] = {
        id: order.id,
        status: order.status,
        discount: order.discount,
        timestamp: order.timestamp,
        amount: amt,
        vat: amt * order.vat,
        serviceCharge: amt * order.serviceCharge,
        remark: order.remark,
        table: order.number,
        items: [{
          id: order.menuItemId,
          qty: order.qty,
          rate: order.rate,
        }],
      };
    } else {
      r.items.push({
        id: order.menuItemId,
        qty: order.qty,
        rate: order.rate,
      });
      r.amount += amt;
      r.vat += amt * order.vat;
      r.serviceCharge += amt * order.serviceCharge;
    }
    return res;
  }, {});
  return orders;
}
