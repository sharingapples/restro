import db from '../../db/';

export  default function addTable(data) {
  return db.execute(async({insert}) => {
    const res = await insert('Tables',data);
    return res;
  });
}