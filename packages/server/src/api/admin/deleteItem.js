import db from '../../db';

export default function deleteItem(data){
  return db.execute(async({deleteQuery}) => {
   const res = await deleteQuery('Item',{id:2});
   return res;
  });
}