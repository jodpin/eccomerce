import { useState, useEffect } from "react";
import ItemProductCart from "../components/ItemProductCart";
import useCart from "../hooks/useCart";
import useCustomer from "../hooks/useCustomer";
import Alert from "../components/Alert";

const Cart = () => {
  const { cart, setCart } = useCart();
  const [total, setTotal] = useState(0);
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const { createOrder } = useCustomer();

  const sendOrder = (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      createOrder(cart);
    } catch (error) {
      setAlert({ msg: error.message, error: true });
    }
    setOrderSent(true);

    setTimeout(() => {
      setAlert({ msg: "Pedido enviado, Gracias por preferirnos 😃" });
      setCart([]);
      setLoading(false);
    }, 6000);
  };

  useEffect(() => {
    let suma = 0;
    cart.map((product) => (suma += product.quantity * product.precio));
    setTotal(suma);
  }, [cart]);

  return (
    <>
      {cart?.length > 0 && (
        <div className="flex justify-evenly items-center bg-gray-300 mb-2 px-2">
          <p className="text-xl text-left underline md:text-2xl">
            Total: <span className="font-bold ">${total}</span>
          </p>
          <button
            onClick={sendOrder}
            className="bg-orange-500 my-5 mb-5 p-3 text-white uppercase bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          >
            Enviar Pedido
          </button>
          <button
            onClick={() => setCart([])}
            className="bg-gray-500 my-5 mb-5 p-3 text-white uppercase bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          >
            Vaciar Carrito
          </button>
        </div>
      )}

      {loading && (
        <p className="text-center font-bold m-5 text-3xl text-sky-700">
          ...ENVIANDO EL PEDIDO...
        </p>
      )}

      {cart?.length > 0
        ? cart.map((item, index) => (
            <ItemProductCart index={index + 1} key={item.id} product={item} />
          ))
        : !orderSent && (
            <h2 className="text-center">
              Nada por aqui 🥺, Ve a la tienda y escoge tus productos preferidos
            </h2>
          )}
      {alert.msg && <Alert alert={alert} />}
    </>
  );
};

export default Cart;
