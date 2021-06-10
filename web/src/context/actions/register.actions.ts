import {
  SET_BUSINESS_MAIL,
  SET_BUSINESS_NAME,
  SET_CURRENCY,
  SET_IMAGES,
  SET_PHONE,
  SET_MAIL,
  SET_NAME,
  SET_PASS,
} from '@context/types/register.types';
import { Dispatch } from 'redux';

export const setBusinessName = (name: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_BUSINESS_NAME,
      payload: name,
    });
  };
};

export const setBusinessMail = (mail: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_BUSINESS_MAIL,
      payload: mail,
    });
  };
};

export const setCurrency = (currency: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_CURRENCY,
      payload: currency,
    });
  };
};

export const setPhone = (phone: string | null) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_PHONE,
      payload: phone,
    });
  };
};

export const setImages = (images: File[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_IMAGES,
      payload: images,
    });
  };
};

export const setName = (name: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_NAME,
      payload: name,
    });
  };
};

export const setMail = (mail: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_MAIL,
      payload: mail,
    });
  };
};

export const setPass = (pass: string) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_PASS,
      payload: pass,
    });
  };
};
