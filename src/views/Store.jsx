import ItemProductStore from "../components/ItemProductStore";

import useCart from "../hooks/useCart";

const Store = () => {
  const { products } = useCart();

  return (
    <div className="grid grid-cols-3 gap-4 w-full" id="product-list">
      {products?.map((product) => (
        <ItemProductStore
          key={product.id}
          id={product.id}
          product={product}
        ></ItemProductStore>
      ))}
    </div>
  );
};

export default Store;
