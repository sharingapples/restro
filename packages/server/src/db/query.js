export default function query(db, sql, ...params) {
  return db.all(sql, ...params);
}
