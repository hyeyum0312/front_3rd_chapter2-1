export interface ProductList {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartSummaryProps {
  cartItem?: ProductList[];
  finalTotalPrice: number;
  itemCount: number;
  preDiscountTotalPrice: number;
}

export interface Accumulator {
  itemCount: number;
  preDiscountTotalPrice: number;
  finalTotalPrice: number;
}
