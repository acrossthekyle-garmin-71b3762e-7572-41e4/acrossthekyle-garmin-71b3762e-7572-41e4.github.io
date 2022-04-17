import {
  ADD_TO_CART,
  CHANGE_QUANTITY_IN_CART,
  ON_LOAD,
  ON_PURCHASED,
  REMOVE_FROM_CART,
  SET_EMAIL
} from './types';

const INITIAL_STATE = {
  cart: [],
  email: '',
  loaded: false,
  products: undefined
};

const addToCart = (cart, payload) => {
  const updatedCart = [...cart];

  const existing = updatedCart.findIndex((item) => item.uuid === payload.uuid);

  if (existing > -1) {
    updatedCart[existing].quantity += payload.quantity;

    if (updatedCart[existing].quantity > 10) {
      updatedCart[existing].quantity = 10;
    }
  } else {
    updatedCart.push(payload);
  }

  return updatedCart;
};

const changeQuantityInCart = (cart, payload) => {
  const updatedCart = [...cart];

  updatedCart[payload.index].quantity = payload.quantity;

  return updatedCart;
};

const removeFromCart = (cart, payload) => {
  const updatedCart = [...cart];

  updatedCart.splice(payload, 1);

  return updatedCart;
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: addToCart(state.cart, action.payload)
      };

    case ON_LOAD:
     	return {
	      ...state,
        loaded: true,
	      products: action.payload
     	};

    case ON_PURCHASED:
      return {
        ...state,
        cart: [],
        email: ''
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: removeFromCart(state.cart, action.payload)
      };

    case CHANGE_QUANTITY_IN_CART:
      return {
        ...state,
        cart: changeQuantityInCart(state.cart, action.payload)
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
