import db from '../../db';

export default function deleteMenuItem(data){
  return db.execute(async({deleteQuery}) => {
   const res = await deleteQuery('MenuItem',{id:1});
   return res;
  });
}