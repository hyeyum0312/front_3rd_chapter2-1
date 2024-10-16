import { CartItem } from "./CartItem";
import { CartSelectList } from "./CartSelectList";
import { CartSummary } from "./CartSummary";

export const Cart = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <div className="bg-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartItem />

        <CartSummary />

        <CartSelectList />

        <button className="bg-blue-500 text-white px-4 py-2 rounded" id="add-to-cart">
          추가
        </button>

        <div className="text-sm text-gray-500 mt-2" id="stock-status"></div>
      </div>
    </div>
  );
};
