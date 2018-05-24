import db from '../../db';

export default function deleteTable(data){
  return db.execute(async({deleteQuery}) => {
   const res = await deleteQuery('Tables',{id:1});
   return res;
  });
}
