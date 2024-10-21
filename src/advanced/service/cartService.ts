import { discountManual } from "../components/data/productList";
import { Accumulator, CartSummaryProps, ProductList } from "../types/product";

export const updateQuantity = (items: ProductList[], productId: string, quantityToAdd: number) => {
  return items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + quantityToAdd } : item));
};

export const applyDiscount = (item: ProductList, discountManual: any[]): number => {
  if (item.quantity < 10) return 0;

  const discountItem = discountManual.find((discount) => discount.currentItemId === item.id);
  return discountItem ? discountItem.discountRate : 0;
};

export const calculateTotalPrice = (cartItems: ProductList[]) => {
  const resultItem = cartItems.reduce(
    (accumulator: Accumulator, item) => {
      let quantity = item.quantity;
      let itemTot = item.price * quantity;
      let discountRate = applyDiscount(item, discountManual);

      accumulator.itemCount += quantity;
      accumulator.preDiscountTotalPrice += itemTot;
      accumulator.finalTotalPrice = (accumulator.finalTotalPrice || 0) + itemTot * (1 - discountRate);

      return accumulator;
    },
    { itemCount: 0, preDiscountTotalPrice: 0, finalTotalPrice: 0 }
  );

  return {
    itemCount: resultItem.itemCount,
    preDiscountTotalPrice: resultItem.preDiscountTotalPrice,
    finalTotalPrice: resultItem.finalTotalPrice,
  };
};

export const calculateDiscountRate = ({ itemCount }: CartSummaryProps) => {
  const BULK_MIN_COUNT = 10;
  const BULK_DISCOUNT_RATE = 0.1;
  const WEEKDAY_DISCOUNT_RATE = 0.05;
  const 화요일 = 2;

  let discountRate = 0;

  // 대량 구매 할인 적용
  if (itemCount >= BULK_MIN_COUNT) {
    discountRate = BULK_DISCOUNT_RATE;
  }

  // 화요일 추가 할인 적용
  if (new Date().getDay() === 화요일) {
    discountRate = Math.max(discountRate, WEEKDAY_DISCOUNT_RATE);
  }

  return discountRate;
};

export const deleteCartItem = (deleteId: string, cartList: ProductList[]) => {
  const filteredList = cartList.filter((item) => item.id !== deleteId);

  return filteredList;
};
