export default async function exec(db, sql, ...params) {
  return db.run(sql, ...params);
}
