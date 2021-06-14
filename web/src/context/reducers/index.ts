import { combineReducers } from 'redux';

import registerReducers from './register.reducers';
import userReducers from './employee.reducers';

//combinar todos los reducers en uno solo
export default combineReducers({
  register: registerReducers,
  employee: userReducers,
});
