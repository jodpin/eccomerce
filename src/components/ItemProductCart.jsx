import useCart from "../hooks/useCart";

const ItemProductCart = ({ product, index }) => {
  const { id, nombre, precio, img, quantity } = product;
  const { deleteFromCart, increaseQuantity, decreaseQuantity } = useCart();
  return (
    <div className="border-2 rounded m-3 md:flex">
      <div className="flex-1 p-2 h-14 flex gap-2 items-center">
        <h3 className="font-bold w-2">{index}.</h3>
        <p className=" md:text-lg text-ellipsis whitespace-pre w-64 font-bold">
          {nombre}
        </p>
        <img
          className="h-full rounded"
          src={img}
          width="50px"
          height="50px"
          alt="imagen"
        />

        <p className="md:text-lg text-right inline-block w-12 font-bold">
          {quantity}
        </p>
        <h4 className="  md:text-lg inline-block w-32 text-right px-5 font-bold ">
          {"$" + precio}
        </h4>

        <h3 className="md:text-lg inline-block w-52  text-right px-5 font-bold">
          {"$" + quantity * precio}
        </h3>
      </div>

      <hr className="mx-2" />
      <div className="flex-1 p-2 h-14 flex gap-2 items-center justify-evenly">
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
      </div>

      {/* al pasarle por parametro el id en el hijo, lo enviamos al padre donde esta definida la funcion*/}
    </div>
  );
};

export default ItemProductCart;
