import db from '../../db';

export default function deleteUser(data){
  return db.execute(async({deleteQuery}) => {
   const res = await deleteQuery('RestaurantUser',{id:2});
   return res;
  });
}