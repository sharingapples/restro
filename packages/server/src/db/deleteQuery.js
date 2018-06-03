
export default async function deleteQuery(db, table, condition) {
  const fields = Object.keys(condition);
  const conditionStr = fields.map(f => `[${f}]=?`).join(' AND ');
  const params = fields.map(f => condition[f]);

  const sql = `DELETE FROM [${table}] WHERE ${conditionStr}`;
  const res = await db.run(sql, ...params);
  return res.stmt.changes;
}
