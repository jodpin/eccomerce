import { useState, createContext } from "react";

import jabondetergente from "../imagenes/jabondetergente.jpg";
import pechu from "../imagenes/pechu.jpg";
import carne from "../imagenes/carne.jpg";
import cebolla from "../imagenes/cebolla.jpg";
import habichuela from "../imagenes/habichuela.jpg";
import huevos from "../imagenes/huevos.jpg";
import naranjas from "../imagenes/naranjas.jpeg";
import papa from "../imagenes/papa.jpg";
import tomate from "../imagenes/tomate.jpg";
import clorox from "../imagenes/clorox.jpg";
import atun from "../imagenes/atun.jpg";
import Salchicha from "../imagenes/Salchicha.png";

const HandlerCartContext = createContext();

const db = [
  {
    id: 11,
    name: "huevo - un.",
    price: 600,
    img: huevos,
  },
  {
    name: "tomate - kilo",
    id: 12,
    price: 200,
    img: tomate,
  },
  {
    name: "cebolla - kilo",
    id: 13,
    price: 300,
    img: cebolla,
  },
  {
    name: "papa - kilo",
    id: 14,
    price: 400,
    img: papa,
  },
  {
    name: "naranjas - kilo",
    id: 15,
    price: 3500,
    img: naranjas,
  },
  {
    name: "carne - libra",
    id: 16,
    price: 17000,
    img: carne,
  },
  {
    name: "pechuga - libra",
    id: 17,
    price: 5900,
    img: pechu,
  },
  {
    name: "habichuela - libra",
    id: 18,
    price: 700,
    img: habichuela,
  },
  {
    name: "lata de atun",
    id: 19,
    price: 4700,
    img: atun,
  },
  {
    name: "paquete de salchichas",
    id: 20,
    price: 6100,
    img: Salchicha,
  },
  {
    name: "jabon en polvo 500gr",
    id: 21,
    price: 4000,
    img: jabondetergente,
  },
  {
    name: "clorox un. x 1000ml",
    id: 22,
    price: 4500,
    img: clorox,
  },
];

const HandlerCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(db);

  function addToCart(product) {
    let productInCart = cart?.find(
      (productInCart) => product.id === productInCart.id
    );

    productInCart
      ? setCart(
          cart?.map((el) =>
            el.id === productInCart.id
              ? { ...el, quantity: el.quantity + 1 }
              : el
          )
        )
      : setCart([...cart, { ...product, quantity: 1 }]);
  }

  function deleteFromCart(id) {
    const kart = cart.filter((product) => product.id != id);
    setCart(kart);
  }

  function increaseQuantity(id) {
    const kart = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(kart);
  }

  function decreaseQuantity(product) {
    if (product.quantity > 1) {
      setCart(
        cart.map((el) =>
          el.id === product.id ? { ...el, quantity: el.quantity - 1 } : el
        )
      );
    } else {
      setCart(cart.filter((el) => el.id !== product.id));
    }
  }

  return (
    <HandlerCartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        products,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </HandlerCartContext.Provider>
  );
};

export { HandlerCartProvider };

export default HandlerCartContext;
