import { ProductList } from "../../types/product";

export const productList: ProductList[] = [
  { id: "p1", name: "상품1", price: 10000, quantity: 50 },
  { id: "p2", name: "상품2", price: 20000, quantity: 30 },
  { id: "p3", name: "상품3", price: 30000, quantity: 20 },
  { id: "p4", name: "상품4", price: 15000, quantity: 0 },
  { id: "p5", name: "상품5", price: 25000, quantity: 10 },
];

export const discountManual = [
  { currentItemId: "p1", discountRate: 0.1 },
  { currentItemId: "p2", discountRate: 0.15 },
  { currentItemId: "p3", discountRate: 0.2 },
  { currentItemId: "p4", discountRate: 0.05 },
  { currentItemId: "p5", discountRate: 0.25 },
];
