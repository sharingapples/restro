import db from '../../db';

export default function updateUser(data,condition) {
  return db.execute(async({update}) => {
    const res = await update('RestaurantUser',data,condition);
    console.log(res);
  });
}