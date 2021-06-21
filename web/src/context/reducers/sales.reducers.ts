import { SalesCtx } from '@interfaces/context.interfaces';
import { AppActions } from '@interfaces';
import { SET_MIN_PRODUCTS } from '@context/types/sales.types';

const initState: SalesCtx = {
  minProducts: [],
};

const reducer = (state = initState, action: AppActions): SalesCtx => {
  switch (action.type) {
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
