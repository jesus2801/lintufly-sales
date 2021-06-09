import { combineReducers } from 'redux';

import registerReducers from './register.reducers';

//combinar todos los reducers en uno solo
export default combineReducers({
  register: registerReducers,
});
