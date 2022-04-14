import { LOADED } from './garminTypes';

const INITIAL_STATE = {
  products: undefined,
  loaded: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADED:
     	return {
	      ...state,
	      products: action.payload,
        loaded: true
     	};

    default:
    	return state;
  }
};

export default reducer;
