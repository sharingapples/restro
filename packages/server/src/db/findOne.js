export default async function find(db, table, condition) {
  if (typeof condition === 'number' || typeof condition === 'string') {
    return db.get(`SELECT * FROM '${table}' WHERE id=?`, condition);
  }

  const fields = Object.keys(condition);
  const conditionStr = fields.map(f => `'${f}'=?`).join(' AND ');
  const params = fields.map(f => condition[f]);

  return db.get(`SELECT * FROM '${table}' WHERE ${conditionStr}`, ...params);
}
