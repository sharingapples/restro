import db from '../../db';

export default function updateItem(data,condition){
  return db.execute(async ({update}) => {
    const res = await update('Item',data,condition);
    return res;
});
}