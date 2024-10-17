import { CartItem } from "./CartItem";
import { CartSelectList } from "./CartSelectList";
import { CartSummary } from "./CartSummary";
import { productList } from "./data/productList";
import { ProductList } from "../types/product";
import { useState } from "react";

export const Cart = () => {
  const [cartItem, setCartItem] = useState<ProductList[]>([]);
  const lowStockItems: ProductList[] = productList.filter((item) => item.quantity < 5);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleAddCart = () => {
    const selectedProduct: ProductList[] = productList.filter((item) => item.id === selectedProductId);
    console.log("selectedProduct", selectedProduct);

    // cartItem에 선택된 상품 추가
    setCartItem((prevItems) => [...prevItems, ...selectedProduct]);
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartItem items={cartItem} />

        <CartSummary />

        <CartSelectList onSelectChange={(id) => setSelectedProductId(id)} />

        <button className="bg-blue-500 text-white px-4 py-2 rounded" id="add-to-cart" onClick={handleAddCart}>
          추가
        </button>

        <div id="stock-status" className="text-sm text-gray-500 mt-2">
          {lowStockItems.map((item) => {
            return (
              <div key={item.id}>
                {item.name}: {item.quantity > 0 ? `재고 부족 (${item.quantity} 개 남음)` : "품절"}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
