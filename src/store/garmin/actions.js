import {
	ADD_TO_CART,
	CHANGE_QUANTITY_IN_CART,
	ON_LOAD,
	ON_PURCHASED,
	REMOVE_FROM_CART
} from './types';

export const addToCart = (payload) => {
  return {
		type: ADD_TO_CART,
		payload
  };
};

export const changeQuantityInCart = (payload) => {
  return {
		type: CHANGE_QUANTITY_IN_CART,
		payload
  };
};

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

export const removeFromCart = (payload) => {
  return {
		type: REMOVE_FROM_CART,
		payload
  };
};
