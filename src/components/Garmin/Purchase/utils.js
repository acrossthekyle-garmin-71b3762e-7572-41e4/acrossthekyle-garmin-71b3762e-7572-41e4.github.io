const axios = require('axios').default;

export const calculateCost = async (choice, quantity) => {
  return axios.post('/api/garmin/calculate', {
    choice,
    quantity
  });
};

export const getName = (choice, products) => {
  if (!choice || !products) {
    return '';
  }

  return products.filter(({ uuid }) => choice === uuid)[0].name;
};
