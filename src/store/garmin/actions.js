import { ON_LOAD, ON_PURCHASED, SET_CHOICE, SET_EMAIL, SET_QUANTITY } from './types';

export const onLoaded = (payload) => {
  return {
		type: ON_LOAD,
		payload
  };
};

export const onPurchased = () => {
  return {
		type: ON_PURCHASED
  };
};

export const setChoice = (payload) => {
  return {
		type: SET_CHOICE,
		payload
  };
};

export const setEmail = (payload) => {
  return {
		type: SET_EMAIL,
		payload
  };
};

export const setQuantity = (payload) => {
  return {
		type: SET_QUANTITY,
		payload
  };
};
