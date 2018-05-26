import db from '../../db';

export default function updateTable(data,condition){
  db.execute(async({update}) => {
    const res = await update('Tables',data,condition);
    return res;
  });
}