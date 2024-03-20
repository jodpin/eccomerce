import useAdmin from "../hooks/useAdmin";

const ItemProductCartAdmin = ({ product, index }) => {
  const { id, nombre, precio, img, quantity } = product;
  const { deleteFromCart, increaseQuantity, decreaseQuantity } = useAdmin();

  return (
    <div className="border-2 rounded md:m-3 md:flex">
      <div className="flex-1 p-2 h-14 flex gap-2 items-center">
        <h3 className="hidden md:block font-bold w-2">{index}.</h3>
        <p className=" text-lg md:overflow-hidden inline-block md:w-64 mx-5 font-bold">
          {nombre}
        </p>

        <img
          className="h-full hidden md:block rounded "
          src={img}
          width="50px"
          height="50px"
          alt="imagen"
        />

        <p className=" inline-block w-12 text-lg text-right font-bold">
          {quantity}
        </p>

        <h4 className="  text-lg inline-block md:w-32 text-right px-3 font-bold ">
          {"$" + precio}
        </h4>

        <h3 className="inline-block md:w-52  text-right text-lg px-3 font-bold">
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

        {/* al pasarle por parametro el id en el hijo, lo enviamos al padre donde esta definida la funcion*/}
      </div>
    </div>
  );
};

export default ItemProductCartAdmin;
