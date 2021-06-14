import { EmployeeCtx } from '@interfaces/context.interfaces';
import { AppActions } from '@interfaces';

import { SET_PAYLOAD } from '@context/types/employee.types';

const initState: EmployeeCtx = {
  payload: null,
};

const reducer = (state = initState, action: AppActions): EmployeeCtx => {
  switch (action.type) {
    case SET_PAYLOAD:
      return {
        ...state,
        payload: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
