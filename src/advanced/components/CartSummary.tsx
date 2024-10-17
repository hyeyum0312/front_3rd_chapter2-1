import { useState } from "react";
import { ProductList } from "../types/product";
import { productList } from "./data/productList";

export const CartSummary = () => {
  const [discountRate, setDiscountRate] = useState(0);
  const [infoMessage, setInfoMessage] = useState("");

  return (
    <div className="text-xl font-bold my-4" id="cart-total">
      총액: 0원
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: 0)
      </span>
      {discountRate > 0 ? <span className="text-green-500 ml-2"> % 할인 적용</span> : ""}
    </div>
  );
};
