const CART = {
  id: 1,
  quantity: 5,
  product: {
    id: 1,
    price: 10000,
    name: "치킨",
    category: "categoryName",
    imageUrl:
      "https://contents.lotteon.com/itemimage/20250302031740/LM/88/01/39/20/11/96/2_/00/1/LM8801392011962_001_1.jpg/dims/resizef/554X554",
  },
};

export const CART_ITEMS = Array.from({ length: 5 }, (_, index) => ({
  ...CART,
  id: index + 1,
  product: {
    ...CART.product,
    id: index + 1,
    name: `치킨 ${index + 1}`,
  },
}));
