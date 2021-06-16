import { Dispatch } from 'redux';

import { SET_MIN_PRODUCTS, SET_PRODUCTS_LIST } from '@context/types/sales.types';

import { CompleteProduct, MinProductsInfo } from '@interfaces/states';

export const setMinProducts = (products: MinProductsInfo[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_MIN_PRODUCTS,
      payload: products,
    });
  };
};

export const setCompleteProducts = (products: CompleteProduct[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_PRODUCTS_LIST,
      payload: products,
    });
  };
};
