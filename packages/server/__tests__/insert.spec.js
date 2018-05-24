
import addUser from '../src/api/admin/addUser';
import addItem from '../src/api/admin/addItem';
import addMenuItem from '../src/api/admin/addMenuItem';
import addTable from '../src/api/admin/addTable';
import reconcile from '../src/api/admin/reconcile';

const SESSION_DATA = {
  user: { id: 1, name: 'Bhagya Testing' },
}

describe('It ckecks the insertion for admin scope', () => {
  const sessionObj = {
  session:{  get: key => SESSION_DATA[key],}
  };

  it('check for user insertion',async () => {
    const res = await addUser({name: 'jamtam',restaurantId:1, role: 'Admin',username:'jptam',password:'ram123'});
    console.log(res);
    });

    it('item insertion test', async () => {
   const res = await addItem({name:'momo', restaurantId: 1, unit:'plate',itemTypeId: 1,threshold: 100});
   console.log(res);
    });

    it('menuItem insertion test',async () => {
    const res = await addMenuItem({itemId: 1, itemTypeId: 1, name: 'buff Momo', qty:1, price:150});
    console.log(res);
    });
  it('Table insertin test',async () => {
      const res = await addTable({restaurantId: 1,name: 'tableNO 2',top: 0, left: 0, angle:0});
      console.log(res);
  });
  it('Reconcile test ', async () => {
    const res = await reconcile.call(sessionObj,[{stock: 12,itemId: 4},{stock: 13,itemId: 5},{stock: 14,itemId: 6},{stock: 15,itemId: 7}]);
    console.log('reconcile result',res);
  });
});