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
    nombre: "huevo - un.",
    id: 11,
    precio: 600,
    img: huevos,
  },
  {
    nombre: "tomate - kilo",
    id: 12,
    precio: 200,
    img: tomate,
  },
  {
    nombre: "cebolla - kilo",
    id: 13,
    precio: 300,
    img: cebolla,
  },
  {
    nombre: "papa - kilo",
    id: 14,
    precio: 400,
    img: papa,
  },
  {
    nombre: "naranjas - kilo",
    id: 15,
    precio: 3500,
    img: naranjas,
  },
  {
    nombre: "carne - libra",
    id: 16,
    precio: 17000,
    img: carne,
  },
  {
    nombre: "pechuga - libra",
    id: 17,
    precio: 5900,
    img: pechu,
  },
  {
    nombre: "habichuela - libra",
    id: 18,
    precio: 700,
    img: habichuela,
  },
  {
    nombre: "lata de atun",
    id: 19,
    precio: 4700,
    img: atun,
  },
  {
    nombre: "paquete de salchichas",
    id: 20,
    precio: 6100,
    img: Salchicha,
  },
  {
    nombre: "jabon en polvo 500gr",
    id: 21,
    precio: 4000,
    img: jabondetergente,
  },
  {
    nombre: "clorox un. x 1000ml",
    id: 22,
    precio: 4500,
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
