import { Dispatch } from 'redux';

import { SET_MIN_PRODUCTS } from '@context/types/sales.types';

import { MinProductsInfo } from '@interfaces/states';

export const setMinProducts = (products: MinProductsInfo[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_MIN_PRODUCTS,
      payload: products,
    });
  };
};
