import { createSelector } from 'reselect'

const selectGarmin = state => state.garmin;

export const selectClientId = createSelector(
	selectGarmin,
	(garmin) => {
		if (process.env.NODE_ENV === 'development') {
			return 'Abny9Qva83EbxXxthpqaTYHifJGptx73dZX6uWh-z8UDaF-xK8g5sPkSz59_YR4Bwy696QjpQ5-r5meb';
		}

		return 'AfukE7xeOHI3Qh5RGage7d9BYnxG0NHw_WEq0H_aoTRfEDMjOdRVAj7EpoyVQfSaoDDDGBuqqV02jEUu';
	}
);

export const selectProducts = createSelector(
	selectGarmin,
	(garmin) => garmin.products
);

export const selectLoaded = createSelector(
	selectGarmin,
	(garmin) => garmin.loaded
);

export const selectCart = createSelector(
	selectGarmin,
	(garmin) => {
		return garmin.cart.map(({ quantity, uuid }) => ({
	  	product: garmin.products.filter((product) => product.uuid === uuid)[0],
	  	quantity,
	  	uuid
	  }));
	}
);

export const selectCartAmountDue = createSelector(
	selectGarmin,
	(garmin) => {
		let total = 0;
		let discount = 0;

		const getsBundledDiscount = garmin.cart.length > 1;

	  garmin.cart.forEach(({ uuid, quantity }) => {
	  	const item = garmin.products.filter((product) => product.uuid === uuid)[0];

	    total += Number((item.sale !== undefined ? item.sale : item.cost) * quantity);

	    if (getsBundledDiscount && item.sale === undefined) {
				discount += quantity;
			}
	  });

	  return {
	  	discount,
	  	total,
	  };
	}
);

export const selectCartCount = createSelector(
	selectGarmin,
	(garmin) => {
		let total = 0;

	  garmin.cart.forEach(({ quantity }) => {
	    total += quantity;
	  });

	  return total;
	}
);

export const selectCartHasSaleItems = createSelector(
	selectGarmin,
	(garmin) => {
		let saleCount = 0;

  	garmin.cart.forEach(({ uuid }) => {
			const item = garmin.products.filter((product) => product.uuid === uuid)[0];

			if (item?.sale !== undefined) {
				saleCount += 1;
			}
	  });

	  return saleCount > 0;
	}
);
