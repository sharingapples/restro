import db from '../../db/';

export  default function addItem(data) {
  return db.execute(async({insert}) => {
    const res = await insert('Item',data);
    return res;
  });
}