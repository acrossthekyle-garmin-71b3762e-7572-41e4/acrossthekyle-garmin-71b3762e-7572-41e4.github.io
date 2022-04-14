import { LOADED } from './garminTypes';

export const onLoaded = (payload) => {
  return {
		type: LOADED,
		payload
  };
};
