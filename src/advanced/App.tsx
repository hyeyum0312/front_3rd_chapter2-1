import React from "react";
import { Cart } from "./components/Cart";
import { CartContext } from "./context/CartContext";
import { CartProvider } from "./context/CartProvider";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Cart></Cart>
    </CartProvider>
  );
};

export default App;
