import ItemProductStore from "../components/ItemProductStore";

import useCart from "../hooks/useCart";

const Store = () => {
  const { products } = useCart();

  return (
    <div
      className="w-screen grid justify-center md:grid-cols-3 
      sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-slate-400"
      id="product-list"
    >
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
