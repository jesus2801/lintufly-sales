import { AppActions } from '@interfaces';
import { RegisterCtx } from '@interfaces/context.interfaces';
import {
  SET_BUSINESS_MAIL,
  SET_BUSINESS_NAME,
  SET_IMAGES,
  SET_CURRENCY,
  SET_PHONE,
  SET_MAIL,
  SET_NAME,
  SET_PASS,
} from '../types/register.types';

const initState: RegisterCtx = {
  businessMail: '',
  businessName: '',
  images: [],
  currency: '',
  mail: '',
  name: '',
  pass: '',
  phone: null,
};

const reducer = (state = initState, action: AppActions): RegisterCtx => {
  switch (action.type) {
    case SET_BUSINESS_NAME:
      return {
        ...state,
        businessName: action.payload,
      };

    case SET_BUSINESS_MAIL:
      return {
        ...state,
        businessMail: action.payload,
      };

    case SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };

    case SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };

    case SET_PHONE:
      return {
        ...state,
        phone: action.payload,
      };

    case SET_MAIL:
      return {
        ...state,
        mail: action.payload,
      };

    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };

    case SET_PASS:
      return {
        ...state,
        pass: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
