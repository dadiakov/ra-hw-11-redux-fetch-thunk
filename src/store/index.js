import { createStore, combineReducers, applyMiddleware } from 'redux';
import ItemsListReducer from '../reducers/ItemsListReducer.js';
import CreateItemFormReducer from '../reducers/CreateItemFormReducer.js';
import StatusReducer from '../reducers/StatusReducer.js'
import thunk from 'redux-thunk';

const reducer = combineReducers({
  itemsListReducer: ItemsListReducer,
  createItemFormReducer: CreateItemFormReducer,
  statusReducer: StatusReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
export default store;
