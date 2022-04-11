import { LOADED } from './garminTypes';

const INITIAL_STATE = {
  apps: undefined,
  bundles: undefined,
  loaded: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADED:
     	return {
	      ...state,
	      apps: action.payload.apps,
	      bundles: action.payload.bundles,
        loaded: true
     	};

    default:
    	return state;
  }
};

export default reducer;
