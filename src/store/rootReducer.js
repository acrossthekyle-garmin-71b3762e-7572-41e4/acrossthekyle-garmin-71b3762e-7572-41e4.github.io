import { combineReducers } from 'redux';

import garminReducer from './garminReducer';

const rootReducer = combineReducers({
  garmin: garminReducer,
});

export default rootReducer;
