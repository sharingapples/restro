import { createStore, combineReducers } from 'redux';
import { reducer as schemaReducer } from './schema';
import { reducer as accountReducer } from './account';
import { reducer as uiReducer } from './ui';

// TODO: uiReducer is not being used, the title is changed via Context

const reducer = combineReducers({
  database: schemaReducer('Category', 'Item', 'MenuItem', 'Table', 'Order'),
  account: accountReducer(),
  ui: uiReducer(),
});

const store = createStore(reducer);

export default store;
