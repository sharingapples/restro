import db from '../../db';

export default function reconcile(data) {
const { session } = this;

 return db.execute(async ({insert}) => {
   const res = await Promise.all(
    data.map(item => {
      const res = insert('ItemStock',{
       itemId: item.itemId,
       stock: item.stock,
       userId: session.get('user').id,
       timestamp: Date.now(),
      });
    })
   );
   return true;
 });
}