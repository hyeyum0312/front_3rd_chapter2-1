import { ProductList } from "../types/product";

export const updateQuantity = (items: ProductList[], productId: string, quantityToAdd: number) => {
  return items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + quantityToAdd } : item));
};

export const calculateTotalPrice = (cartItems: ProductList[]) => {
  console.log("cartItems", cartItems);

  const discountMenual = [
    { currentItemId: "p1", discountRate: 0.1 },
    { currentItemId: "p2", discountRate: 0.15 },
    { currentItemId: "p3", discountRate: 0.2 },
    { currentItemId: "p4", discountRate: 0.05 },
    { currentItemId: "p5", discountRate: 0.25 },
  ];

  let cartTotalPrice = 0;
  let totalAmount = 0;
  let itemCount = 0;

  for (const item of cartItems) {
    let quantity = item.quantity;
    let itemTot = item.price * quantity;
    let discountRate = 0;

    itemCount += quantity;
    cartTotalPrice += itemTot;

    if (quantity >= 10) {
      const discountItem = discountMenual.find((discount) => discount.currentItemId === item.id);
      if (discountItem) {
        discountRate = discountItem.discountRate;
      }
    }

    totalAmount += itemTot * (1 - discountRate);
  }

  return { cartTotalPrice, totalAmount, itemCount };
};

// export const calculateDiscountRate = (cartTotalPrice) => {
//   let discountRate = 0;

//   if (itemCount >= BULK_MIN_COUNT) {
//     let bulkDiscount = totalAmount * BULK_DISCOUNT_RATE;
//     let itemDiscount = cartTotalPrice - totalAmount;

//     if (bulkDiscount > itemDiscount) {
//       totalAmount = cartTotalPrice * (1 - BULK_DISCOUNT_RATE);
//       discountRate = BULK_DISCOUNT_RATE;
//     }
//   } else {
//     discountRate = (cartTotalPrice - totalAmount) / cartTotalPrice;
//   }

//   if (new Date().getDay() === 2) {
//     totalAmount *= 1 - WEEKDAY_DISCOUNT_RATE;
//     discountRate = Math.max(discountRate, WEEKDAY_DISCOUNT_RATE);
//   }

//   return discountRate;
// };
