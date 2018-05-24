import updateUser from '../src/api/admin/updateUser';
import updateItem from '../src/api/admin/updateItem';
import updateTable from '../src/api/admin/updateTable';
import updateMenuItem from '../src/api/admin/updateMenuItem';

describe('update test ', () => {
  it('update user test',async () => {
    const res = await updateUser({name: 'bhagya'},{id: 3});
    console.log('updated user id',res);
  });

  it('update item test',async () => {
    const res= await updateItem({name: 'chaumin'},{id:1});
    console.log('updated item', res);
  });

  it('update table test',async () => {
    const res= await updateTable({name: 'new Table No'},{id:1});
    console.log('updated table', res);
  });

  it('update menuItem test', async () => {
    const res = await updateMenuItem({name: 'new menuitem update'},{id:3});
    console.log('update menuItem',res);
  });
});