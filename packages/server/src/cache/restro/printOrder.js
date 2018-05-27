import db from '../../db';

export default function printOrder(restro, cashierId, tableId, discount, serviceCharge, remark) {
  db.execute(async ({ update }) => {
    const table = restro.tables[tableId];
    const order = table.activeOrder;
    if (!order) {
      return null;
    }

    await update('Order', {
      timestamp: Date.now(),
      status: 'Complete',
      userId: cashierId,
      discount,
      serviceCharge,
      remark,
    }, { id: order.id });

    // Clear the active Order
    table.activeOrder = null;

    // Update the item stock
    order.items.forEach((orderItem) => {
      const menuItem = restro.menuItems[orderItem.menuItemId];
      const item = restro.items[menuItem.itemId];

      item.stock -= menuItem.qty * orderItem.qty;
    });

    return order;
  });
}
