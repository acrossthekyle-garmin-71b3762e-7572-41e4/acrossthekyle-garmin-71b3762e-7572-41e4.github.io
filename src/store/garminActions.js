import { LOADED } from './garminTypes';

export const onLoaded = (apps, bundles) => {
  return {
		type: LOADED,
		payload: {
			apps,
			bundles,
		}
  };
};
