import db from '../../db';

export default function updateMenuItem(data,condition){
  db.execute(async({update}) => {
    const res = await update('MenuItem',data,condition);
    return res;
  });
}