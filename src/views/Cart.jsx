import React from "react";
import ItemProductCart from "../components/ItemProductCart";
import useCart from "../hooks/useCart";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="grid ">
      {cart.map((item) => (
        <ItemProductCart key={item.id} product={item} />
      ))}
    </div>
  );
};

export default Cart;
