import { combineReducers } from 'redux';

import { reducer as garminReducer } from './garmin/reducer';

const reducer = combineReducers({
  garmin: garminReducer,
});

export default reducer;
