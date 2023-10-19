import { useState, useEffect } from "react";
import ItemProductCart from "../components/ItemProductCart";
import useCart from "../hooks/useCart";

const Cart = () => {
  const { cart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let suma = 0;
    cart.map((product) => (suma += product.quantity * product.price));
    setTotal(suma);
  }, [cart]);

  return (
    <>
      <p className="text-2xl text-right">
        Total: <span className="font-bold ">${total}</span>
      </p>
      {cart?.length > 0 ? (
        cart.map((item, index) => (
          <ItemProductCart index={index + 1} key={item.id} product={item} />
        ))
      ) : (
        <h2 className="text-center">
          Nada por aqui 🥺, Ve a la tienda y escoge tus productos preferidos
        </h2>
      )}
    </>
  );
};

export default Cart;
