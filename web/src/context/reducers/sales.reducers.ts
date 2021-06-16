import { SalesCtx } from '@interfaces/context.interfaces';
import { AppActions } from '@interfaces';
import { SET_MIN_PRODUCTS, SET_PRODUCTS_LIST } from '@context/types/sales.types';

const initState: SalesCtx = {
  minProducts: [],
  completeProducts: [],
};

const reducer = (state = initState, action: AppActions): SalesCtx => {
  switch (action.type) {
    case SET_PRODUCTS_LIST:
      return {
        ...state,
        completeProducts: action.payload,
      };

    case SET_MIN_PRODUCTS:
      return {
        ...state,
        minProducts: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
