import db from '../../db';

export default function cancelOrder(restro, cashierId, tableId, remark) {
  db.execute(async ({ update }) => {
    const table = restro.tables[tableId];

    if (!table.activeOrder) {
      return null;
    }

    await update(
      'Order',
      { status: 'Cancel', userId: cashierId, remark },
      { id: table.activeOrder.id }
    );

    table.activeOrder = null;
    return true;
  });
}
