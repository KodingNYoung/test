import { combineReducers } from 'redux';

import authReducers from './authReducers';
import auditorReducers from './auditorReducers';
import merchantReducers from './merchantReducers';
import paymentReducers from './paymentReducers';

export default combineReducers({
  authReducers,
  auditorReducers,
  merchantReducers,
  paymentReducers,
});
