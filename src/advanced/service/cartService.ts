// import { ProductList } from "../types/product";

// const decreaseProductQuantity = (selectedProduct, quantityChange) => {
//   selectedProduct.quantity -= quantityChange; // 재고 차감
// };

// // 카트에 상품 추가
// export const newCartItem = (selectedProduct) => {
//   let newItem = createElement("div", { id: `${selectedProduct.id}`, className: "flex justify-between items-center mb-2" });

//   const html = `
//     <span>${selectedProduct.name} - ${selectedProduct.price}원 x 1</span>
//     <div>
//       <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="-1"> - </button>
//       <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="1"> + </button>
//       <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${selectedProduct.id}">삭제</button>
//     </div>
//   `;

//   newItem.innerHTML = html;
//   $cartItemDiv.appendChild(newItem);
//   selectedProduct.quantity--;
// };

// // 카트에 추가된 상품 제거
// export const removeCartItem = (selectedProduct, currentQuantity) => {
//   const removeItem = document.getElementById(selectedProduct.id);
//   restoreProductQuantity(selectedProduct, currentQuantity);
//   removeItem.remove();
// };

// // 쇼핑 카트 카드 최종가, 할인, 포인트 계산 및 view
// export const calcCart = () => {
//   let { cartTotalPrice, totalAmount } = calcTotalAmount();
//   let discountRate = calculateDiscountRate(cartTotalPrice);

//   $cartTotalDiv.textContent = "총액: " + Math.round(totalAmount) + "원";

//   if (discountRate > 0) {
//     let $discountRateSpan = createElement("span", { className: "text-green-500 ml-2", textContent: "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)" });
//     $cartTotalDiv.appendChild($discountRateSpan);
//   }

//   updateStockInfo();
//   renderbonusPoint();
// };
