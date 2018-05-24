import db from '../../db/';

export  default function addMenuItem(data) {
  return db.execute(async({insert}) => {
    const res = await insert('MenuItem',data);
    return res;
  });
}