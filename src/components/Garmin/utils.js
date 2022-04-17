export const getName = (choice, products) => {
  if (!choice || !products) {
    return '';
  }

  return products.filter(({ uuid }) => choice === uuid)[0].name;
};

export const getCost = (choice, products) => {
  if (!choice || !products) {
    return '';
  }

  return products.filter(({ uuid }) => choice === uuid)[0].cost;
};

export const getCartCount = (cart) => {
  let total = 0;

  cart.forEach(({ quantity }) => {
    total += quantity;
  });

  return total;
};
