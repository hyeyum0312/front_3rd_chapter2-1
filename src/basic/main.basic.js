const BULK_DISCOUNT_RATE = 0.25; // 25%의 대량 할인율
const BULK_MIN_COUNT = 30; // 대량 할인을 받기 위한 최소 품목 수
const WEEKDAY_DISCOUNT_RATE = 0.1; // 수요일 할인율

let $wrapperDiv, $containerDiv, $hTxt, $cartDisp, $sum, $sel, $addBtn, $stockInfo;
let prodList, lastSel;

let bonusPts = 0;
let totalAmt = 0;
let itemCnt = 0;

const createOption = (item) => {
  let optionValue = item.id;
  let textContent = `${item.name} - ${item.val}원`;
  let $opt = createElement("option", { value: optionValue, textContent: textContent });

  if (item.q === 0) {
    $opt.disabled = true;
  }

  return $opt;
};

const calcDiscRate = (subTot) => {
  let discRate = 0;

  if (itemCnt >= BULK_MIN_COUNT) {
    let bulkDisc = totalAmt * BULK_DISCOUNT_RATE;
    let itemDisc = subTot - totalAmt;

    if (bulkDisc > itemDisc) {
      totalAmt = subTot * (1 - BULK_DISCOUNT_RATE);
      discRate = BULK_DISCOUNT_RATE;
    }
  } else {
    discRate = (subTot - totalAmt) / subTot;
  }

  if (new Date().getDay() === 2) {
    totalAmt *= 1 - WEEKDAY_DISCOUNT_RATE;
    discRate = Math.max(discRate, WEEKDAY_DISCOUNT_RATE);
  }

  return discRate;
};

// 재고정보 메세지 생성
const createStockMessage = (lowStockItems) => {
  let infoMsg = "";

  lowStockItems.forEach((item) => {
    let quantity = item.q;
    infoMsg += `${item.name}: ${quantity > 0 ? `재고 부족 (${quantity} 개 남음)` : "품절"}\n`;
  });

  return infoMsg;
};

// 카트에 추가된 상품 제거
const removeCartItem = (prod, currentQty) => {
  const item = document.getElementById(prod.id);
  prod.q += currentQty; // 기존 수량만큼 재고 복구
  item.remove();
};

// 카트에 추가된 상품 업데이트
const updateCartItem = (itemToAdd, qtyChange = 1) => {
  const item = document.getElementById(itemToAdd.id);
  const $currentCartItemTextContent = item.querySelector("span").textContent;
  const currentCartItemInfo = $currentCartItemTextContent.split("x ")[0];
  const currentQty = parseInt($currentCartItemTextContent.split("x ")[1]);

  let newQty = currentQty + qtyChange;

  // 수량이 유효할 경우 업데이트
  const isValidQuantity = newQty > 0 && newQty <= itemToAdd.q + currentQty;
  if (isValidQuantity) {
    item.querySelector("span").textContent = `${currentCartItemInfo}x ${newQty}`;
    itemToAdd.q -= qtyChange; // 재고 차감
    return;
  }

  // 수량이 0 이하가 되는 경우 상품 제거
  const isZeroOrNegativeQuantity = newQty <= 0;
  if (isZeroOrNegativeQuantity) {
    removeCartItem(itemToAdd, currentQty);
    return;
  }

  alert("재고가 부족합니다.");
};

// 카트에 상품 추가
const newCartItem = (itemToAdd) => {
  let newItem = createElement("div", { id: `${itemToAdd.id}`, className: "flex justify-between items-center mb-2" });

  const html = `
    <span>${itemToAdd.name} - ${itemToAdd.val}원 x 1</span>
    <div>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1"> - </button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1"> + </button>
      <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
    </div>
  `;

  newItem.innerHTML = html;
  $cartDisp.appendChild(newItem);
  itemToAdd.q--;
};

function main() {
  prodList = [
    { id: "p1", name: "상품1", val: 10000, q: 50 },
    { id: "p2", name: "상품2", val: 20000, q: 30 },
    { id: "p3", name: "상품3", val: 30000, q: 20 },
    { id: "p4", name: "상품4", val: 15000, q: 0 },
    { id: "p5", name: "상품5", val: 25000, q: 10 },
  ];

  renderUI();
  updateSelOpts();
  calcCart();
  notifySaleMessage();
}

const createElement = (type, attributes) => {
  const $element = document.createElement(type);

  for (const key in attributes) {
    $element[key] = attributes[key];
  }

  return $element;
};

function renderUI() {
  const $root = document.getElementById("app");

  $wrapperDiv = createElement("div", { className: "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8" });
  $containerDiv = createElement("div", { className: "bg-gray-100 p-8" });
  $hTxt = createElement("h1", { className: "text-2xl font-bold mb-4", textContent: "장바구니" });
  $cartDisp = createElement("div", { id: "cart-items" });

  $sum = createElement("div", { className: "text-xl font-bold my-4", id: "cart-total" });
  $sel = createElement("select", { className: "border rounded p-2 mr-2", id: "product-select" });
  $addBtn = createElement("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", id: "add-to-cart", textContent: "추가" });
  $stockInfo = createElement("div", { className: "text-sm text-gray-500 mt-2", id: "stock-status" });

  $wrapperDiv.appendChild($hTxt);
  $wrapperDiv.appendChild($cartDisp);
  $wrapperDiv.appendChild($sum);
  $wrapperDiv.appendChild($sel);
  $wrapperDiv.appendChild($addBtn);
  $wrapperDiv.appendChild($stockInfo);

  $containerDiv.appendChild($wrapperDiv);
  $root.appendChild($containerDiv);
}

function renderBonusPts() {
  let ptsTag = document.getElementById("loyalty-points");
  bonusPts += Math.floor(totalAmt / 1000);

  if (!ptsTag) {
    ptsTag = createElement("span", { className: "text-blue-500 ml-2", id: "loyalty-points" });
    $sum.appendChild(ptsTag);
  }

  ptsTag.textContent = `(포인트: ${bonusPts})`;
}

// 재고정보 메세지 Dom 업데이트
function updateStockInfo() {
  const lowStockItems = prodList.filter((item) => item.q < 5);
  let stockMessage = createStockMessage(lowStockItems);

  $stockInfo.textContent = stockMessage;
}

function notifySaleMessage() {
  setTimeout(function () {
    setInterval(function () {
      let luckyItem = prodList[Math.floor(Math.random() * prodList.length)];

      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        let suggest = prodList.find(function (item) {
          return item.id !== lastSel && item.q > 0;
        });
        if (suggest) {
          alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
          suggest.val = Math.round(suggest.val * 0.95);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelOpts() {
  $sel.innerHTML = "";

  prodList.forEach(function (item) {
    let options = createOption(item);

    return $sel.appendChild(options);
  });
}

function calcTotalAmount() {
  const discountMenual = [
    { curItemId: "p1", disc: 0.1 },
    { curItemId: "p2", disc: 0.15 },
    { curItemId: "p3", disc: 0.2 },
    { curItemId: "p4", disc: 0.05 },
    { curItemId: "p5", disc: 0.25 },
  ];

  const $cartItems = $cartDisp.children;
  let subTot = 0;

  totalAmt = 0;
  itemCnt = 0;

  for (let i = 0; i < $cartItems.length; i++) {
    let curItem = prodList.find((item) => item.id === $cartItems[i].id);
    let q = parseInt($cartItems[i].querySelector("span").textContent.split("x ")[1]);
    let itemTot = curItem.val * q;
    let disc = 0;

    itemCnt += q;
    subTot += itemTot;

    if (q >= 10) {
      const discountItem = discountMenual.find((item) => item.curItemId === curItem.id);
      disc = discountItem.disc;
    }

    totalAmt += itemTot * (1 - disc);
  }

  return { subTot, totalAmt };
}

function calcCart() {
  let { subTot, totalAmt } = calcTotalAmount();
  let discRate = calcDiscRate(subTot);

  $sum.textContent = "총액: " + Math.round(totalAmt) + "원";

  if (discRate > 0) {
    let span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
    $sum.appendChild(span);
  }

  updateStockInfo();
  renderBonusPts();
}

main();

$addBtn.addEventListener("click", function () {
  let selItem = $sel.value;

  let itemToAdd = prodList.find((p) => {
    return p.id === selItem;
  });

  if (itemToAdd && itemToAdd.q > 0) {
    let item = document.getElementById(itemToAdd.id);

    if (item) {
      // 동일 제품 카트 추가
      updateCartItem(itemToAdd);
    } else {
      // 새로운 재품 카트 추가
      newCartItem(itemToAdd);
    }

    calcCart();
    lastSel = selItem;
  }
});

$cartDisp.addEventListener("click", function (event) {
  const $tgt = event.target;
  const $quantityChange = $tgt.classList.contains("quantity-change");
  const $removeItem = $tgt.classList.contains("remove-item");

  if ($quantityChange || $removeItem) {
    const prodId = $tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const $cartItemsTextContent = itemElem.querySelector("span").textContent;
    const currentQuantity = parseInt($cartItemsTextContent.split("x ")[1]);
    const qtyChange = parseInt($tgt.dataset.change);

    let prod = prodList.find((p) => p.id === prodId);

    // 수량변경
    if ($quantityChange) {
      updateCartItem(prod, qtyChange);
    }

    // 카트에 추가된 상품 제거
    if ($removeItem) {
      removeCartItem(prod, currentQuantity);
    }

    calcCart();
  }
});
