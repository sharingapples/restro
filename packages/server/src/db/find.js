export default async function find(db, table, condition) {
  if (!condition) {
    return db.all(`SELECT * FROM '${table}'`);
  }

  const fields = Object.keys(condition);
  const conditionStr = fields.map(f => `'${f}'=?`).join(' AND ');
  const params = fields.map(f => condition[f]);

  return db.all(`SELECT * FROM '${table}' WHERE ${conditionStr}`, ...params);
}
