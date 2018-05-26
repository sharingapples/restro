import db from '../../db';

export default function cancelOrder(data){
  return db.execute(async({findOne}) => {
    console.log('cancelOrder called');
   const res = await findOne('Items',{id:1});

   console.log('table id',res)
  })
}