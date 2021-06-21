import { SET_MIN_PRODUCTS, SET_SELECTED_PRODUCT } from '@context/types/sales.types';

import { SalesCtx } from '@interfaces/context.interfaces';

import { AppActions } from '@interfaces';

const initState: SalesCtx = {
  minProducts: [],
  selectedProduct: null,
};

const reducer = (state = initState, action: AppActions): SalesCtx => {
  switch (action.type) {
    case SET_MIN_PRODUCTS:
      return {
        ...state,
        minProducts: action.payload,
      };

    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
