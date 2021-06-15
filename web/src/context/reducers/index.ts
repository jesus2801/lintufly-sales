import { combineReducers } from 'redux';

import registerReducers from './register.reducers';
import userReducers from './employee.reducers';
import salesReducers from './sales.reducers';

//combinar todos los reducers en uno solo
export default combineReducers({
  register: registerReducers,
  employee: userReducers,
  sales: salesReducers,
});
