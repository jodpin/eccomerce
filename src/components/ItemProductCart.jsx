import React from "react";
import useCart from "../hooks/useCart";

const ItemProductCart = ({ product, index }) => {
  const { id, name, price, img, quantity } = product;
  const { deleteFromCart, increaseQuantity, decreaseQuantity } = useCart();
  return (
    <div className="w-full pl-2 flex gap-2 border-2 rounded items-center mb-5">
      <h3 className="font-bold">{index}.</h3>
      <p className=" text-lg inline-block w-64 px-5 font-bold">{name}</p>

      <img
        className="h-full rounded "
        src={img}
        width="50px"
        height="50px"
        alt="imagen"
      />

      <p className=" inline-block w-12 text-lg text-right font-bold">
        {quantity}
      </p>
      <h4 className="  text-lg inline-block w-32 text-right px-5 font-bold ">
        {"$" + price}
      </h4>

      <h3 className="inline-block w-52  text-right text-lg px-5 font-bold">
        {"$" + quantity * price}
      </h3>

      <button
        onClick={() => decreaseQuantity(product)}
        className="rounded inline-block p-2  font-bold bg-gray-500 hover:bg-gray-700  text-white"
      >
        -
      </button>
      <button
        onClick={() => deleteFromCart(id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Eliminar
      </button>
      <button
        onClick={() => increaseQuantity(id)}
        className="rounded inline-block p-2  font-bold bg-gray-500 hover:bg-gray-700  text-white"
      >
        +
      </button>

      {/* al pasarle por parametro el id en el hijo, lo enviamos al padre donde esta definida la funcion*/}
    </div>
  );
};

export default ItemProductCart;
