export default async function insert(db, table, values) {
  const fields = Object.keys(values);
  const fieldNames = fields.map(f => `[${f}]`).join(',');
  const fieldPlaceHolders = fields.map(() => '?').join(',');
  const params = fields.map(f => values[f]);

  const sql = `INSERT OR REPLACE INTO [${table}](${fieldNames}) VALUES(${fieldPlaceHolders})`;
  const res = await db.run(sql, ...params);
  return res.lastId;
}
