import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistCellsMiddleware } from './middlewares/persist-cells-middleware';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, persistCellsMiddleware)
);
