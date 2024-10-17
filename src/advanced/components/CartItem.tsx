import { useEffect, useState } from "react";
import { ProductList } from "../types/product";

interface CartItemProps {
  items: ProductList[]; // items prop 추가
}

export const CartItem = ({ items }: CartItemProps) => {
  const [itemList, setItemList] = useState<ProductList[]>(items);
  const [selectedProduct, setSelectedProduct] = useState<ProductList[]>(items);
  const [quantityChange, setQuantityChange] = useState(1);

  useEffect(() => {
    setItemList(items);
  }, [items]);

  const updateCartItem = (updateId: string, changeQuntity: number) => {
    const updateProduct = itemList.filter((item) => item.id === updateId);

    console.log("updateProduct", updateProduct);

    alert("재고가 부족합니다.");
  };

  return (
    <div id="cart-items">
      {itemList.length > 0 ? ( // itemList의 길이가 0보다 큰 경우 렌더링
        itemList.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>
              {item.name} - {item.price}원 x {item.quantity}
            </span>
            <div>
              <button className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id={item.id} data-change="-1" onClick={() => updateCartItem(item.id)}>
                -
              </button>
              <button className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id={item.id} data-change="1">
                +
              </button>
              <button className="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id={item.id}>
                삭제
              </button>
            </div>
          </div>
        ))
      ) : (
        <span>장바구니가 비어 있습니다.</span> // 장바구니가 비어 있을 경우 메시지
      )}
    </div>
  );
};
