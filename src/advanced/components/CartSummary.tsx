import { useEffect, useState } from "react";
import { ProductList } from "../types/product";
import { productList } from "./data/productList";
// import { calculateDiscountRate } from "../service/cartService";

interface CartSummaryProps {
  totalAmount: number;
  itemCount: number;
}

export const CartSummary = ({ totalAmount, itemCount }: CartSummaryProps) => {
  console.log("totalAmount", totalAmount);

  const [discountRate, setDiscountRate] = useState(0);
  const [infoMessage, setInfoMessage] = useState("");
  const [point, setPoint] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(totalAmount);
    let bonusPoint = 0;
    bonusPoint += Math.floor(totalAmount / 1000);
    setPoint(bonusPoint);

    // let discountRate = calculateDiscountRate(totalAmount);
  }, [totalAmount]);

  console.log("itemCount", itemCount);

  return (
    <div className="text-xl font-bold my-4" id="cart-total">
      총액:
      {totalAmount}원{discountRate > 0 ? <span className="text-green-500 ml-2">({(discountRate * 100).toFixed(1)} %할인 적용)</span> : ""}
      <span id="loyalty-points" className="text-blue-500 ml-2">
        (포인트: {point})
      </span>
    </div>
  );
};
