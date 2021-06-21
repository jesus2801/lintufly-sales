import { Dispatch } from 'redux';

import { SET_MIN_PRODUCTS, SET_SELECTED_PRODUCT } from '@context/types/sales.types';

import { CompleteProduct, MinProductsInfo } from '@interfaces/states';

export const setMinProducts = (products: MinProductsInfo[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_MIN_PRODUCTS,
      payload: products,
    });
  };
};

export const setSelectedProduct = (product: null | Omit<CompleteProduct, 'comments'>) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_SELECTED_PRODUCT,
      payload: product,
    });
  };
};
