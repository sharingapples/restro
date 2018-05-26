

export default async function deleteAllById(db,tableName,filter,param) {
  console.log("table name in update order",tableName,filter,param);
    const res = await db.all(`DELETE FROM [${tableName}] WHERE ${filter}`,param);
    return res;
  }