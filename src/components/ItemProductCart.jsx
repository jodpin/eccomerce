import React from "react";

const ItemProductCart = ({ product }) => {
  const { name, price, img, quantity } = product;
  return (
    <div className="w-full flex  bg-slate-400 items-center mb-5">
      <p className=" bg-green-400 text-lg inline-block w-64 px-5 font-bold">
        {name}
      </p>

      <img
        className="h-full rounded "
        src={img}
        width="50px"
        height="50px"
        alt="imagen"
      />

      <p className="bg-red-600 inline-block w-10 text-lg text-right font-bold">
        {quantity}
      </p>
      <h4 className=" bg-blue-600 text-lg inline-block px-5 font-bold ">
        {"$" + price}
      </h4>
      <button>-</button>
      <button className="bg-gray-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded">
        Eliminar
      </button>
      <button>+</button>
      <h3 className="bg-red-600 flex align-center text-lg px-5 font-bold">
        Subtotal
      </h3>
      {/* al pasarle por parametro el id en el hijo, lo enviamos al padre donde esta definida la funcion*/}
    </div>
  );
};

export default ItemProductCart;
