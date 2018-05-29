import { createStore, combineReducers } from 'redux';
import { reducer as schemaReducer } from './schema';
import { reducer as accountReducer } from './account';

const reducer = combineReducers({
  database: schemaReducer('Category', 'Item', 'MenuItem', 'Table', 'Order'),
  account: accountReducer(),
});

const store = createStore(reducer);

export default store;
