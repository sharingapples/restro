
import db from '../../db';
import { hash } from './../../auth/_password';
export default function addUser(data) {
  return db.execute(async ({insert}) => {
    const { password } = data;
    const hashedPassword = hash(password);
    const res = await insert('RestaurantUser',{...data,password: hashedPassword});
    return res;
  });
}
