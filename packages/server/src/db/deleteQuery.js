
export default async function deleteQuery(db, table, condition) {
  const fields = Object.keys(condition);
  const conditionStr = fields.map(f => `'${f}'=?`);
  const params = fields.map(f => condition[f]);

  const res = await db.run(`DELETE FROM '${table}' WHERE ${conditionStr}`, ...params);
  return res.changes;
}
