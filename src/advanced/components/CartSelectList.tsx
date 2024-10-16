import { productList } from "./data/productList";
import { ProductList } from "../types/product";

export const CartSelectList = () => {
  return (
    <select className="border rounded p-2 mr-2" id="product-select">
      {productList.map(({ id, name, price, quantity }: ProductList) => (
        <option key={id} value={id} disabled={quantity === 0}>
          {name} - {price}
        </option>
      ))}
    </select>
  );
};
