import { ON_LOAD, ON_PURCHASED, SET_CHOICE, SET_EMAIL, SET_QUANTITY } from './types';

const INITIAL_STATE = {
  choice: undefined,
  email: '',
  loaded: false,
  products: undefined,
  quantity: 1
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_LOAD:
     	return {
	      ...state,
        loaded: true,
	      products: action.payload
     	};

    case ON_PURCHASED:
      return {
        ...state,
        choice: undefined,
        email: '',
        quantity: 1
      };

    case SET_CHOICE:
      return {
        ...state,
        choice: action.payload,
        quantity: 1
      };

    case SET_QUANTITY:
      return {
        ...state,
        quantity: action.payload
      };

    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    default:
    	return state;
  }
};
