import { SET_PAYLOAD } from '@context/types/employee.types';
import { Dispatch } from 'redux';
import type { EmployeePayload } from '@interfaces/context.interfaces';

export const setUserPayload = (payload: EmployeePayload | null) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_PAYLOAD,
      payload,
    });
  };
};
