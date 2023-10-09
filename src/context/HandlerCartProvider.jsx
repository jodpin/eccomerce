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
    id: 1,
    name: "huevo - un.",
    price: 600,
    img: huevos,
  },
  {
    name: "tomate - kilo",
    id: 2,
    price: 200,
    img: tomate,
  },
  {
    name: "cebolla - kilo",
    id: 3,
    price: 300,
    img: cebolla,
  },
  {
    name: "papa - kilo",
    id: 4,
    price: 400,
    img: papa,
  },
  {
    name: "naranjas - kilo",
    id: 5,
    price: 3500,
    img: naranjas,
  },
  {
    name: "carne - libra",
    id: 6,
    price: 17000,
    img: carne,
  },
  {
    name: "pechuga - libra",
    id: 7,
    price: 5900,
    img: pechu,
  },
  {
    name: "habichuela - libra",
    id: 8,
    price: 700,
    img: habichuela,
  },
  {
    name: "lata de atun",
    id: 9,
    price: 4700,
    img: atun,
  },
  {
    name: "paquete de salchichas",
    id: 10,
    price: 6100,
    img: Salchicha,
  },
  {
    name: "jabon en polvo 500gr",
    id: 11,
    price: 4000,
    img: jabondetergente,
  },
  {
    name: "clorox un. x 1000ml",
    id: 12,
    price: 4500,
    img: clorox,
  },
];

const HandlerCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(db);

  function addToCart(id) {
    //con el id buscamos el producto en la base de datos
    let newProduct = db.find((el) => el.id === id);
    console.log(newProduct);
    //luego de encontrar dicho producto, validamos si este se encuentra en el carro de compras
    let productInCart = cart.find((product) => product.id === newProduct.id);

    //si el elemento ya esta en el carro sumamos uno en su cantidad, de lo contrario lo agregamos
    productInCart
      ? setCart(
          cart.map((el) =>
            el.id === newProduct.id ? { ...el, quantity: el.quantity + 1 } : el
          )
        )
      : setCart([...cart, { ...newProduct, quantity: 1 }]);
    setTimeout(() => {
      console.log(cart);
    }, 5000);
  }

  return (
    <HandlerCartContext.Provider value={{ cart, setCart, addToCart, products }}>
      {children}
    </HandlerCartContext.Provider>
  );
};

export { HandlerCartProvider };

export default HandlerCartContext;
