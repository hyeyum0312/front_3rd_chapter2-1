import React, { createContext, useState, ReactNode } from "react";

// Context 타입 정의
interface CartContextType {
  lastStockItem: string | null;
  setLastStockItem: React.Dispatch<React.SetStateAction<string | null>>;
}

// Context 생성 (기본값은 {}로 설정)
export const CartContext = createContext<CartContextType | null>(null);
