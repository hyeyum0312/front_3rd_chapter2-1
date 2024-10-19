import React, { useContext, useState, ReactNode } from "react";
import { CartContext } from "./CartContext";

// Context Provider 컴포넌트
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lastStockItem, setLastStockItem] = useState<string | null>(null);

  return <CartContext.Provider value={{ lastStockItem, setLastStockItem }}>{children}</CartContext.Provider>;
};

// Context 사용
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
