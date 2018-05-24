import deleteUser from '../src/api/admin/deleteUser';
import deleteItem from '../src/api/admin/deleteItem';
import deleteMenuItem from '../src/api/admin/deleteMenuItem';
import deleteTable from '../src/api/admin/deleteTable';


describe('Its checks the deletion for admin scope', () => {
  it(' check for user deletion', async () => {
    const res = await deleteUser({id:2});
    console.log('deleted user', res);
  });

  it(' check for item deletion', async () => {
    const res = await deleteItem({id:1});
    console.log('deleted item', res);
  });

  it('check for menuItem deletion', async () => {
    const res= await deleteMenuItem({id: 1});
    console.log('deleted menuItem', res);
  });
  it('check for table deletion', async () => {
    const res = await deleteTable({id: 1});
    console.log('deleted table id', res);
  });
});
