import { combineReducers } from 'redux';

import userReducer from './user-reducer';
import productsReducer from './products-reducer';

const rootReducer = combineReducers({
  userReducer,
  productsReducer
});

export default rootReducer;
