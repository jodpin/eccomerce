import useCart from "../hooks/useCart";

const ItemProductStore = ({ product, addCart }) => {
  const { id, name, price, img } = product;

  const {addToCart} = useCart();

  return (
    <div className=" flex flex-col items-center">
      <h3 className="text-lg font-bold">{name}</h3>
      <div className="bg-sky-300 w-40 h-48 rounded">
        <img className="w-100 h-full rounded" src={img} alt="imagen" />
      </div>

      <h4 className="font-bold ">{"$" + price}</h4>
      <button
        onClick={() => addToCart(id)}
        className="bg-gray-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
      >
        Agregar al carrito
      </button>
      {/* al pasarle por parametro el id en el hijo, lo enviamos al padre donde esta definida la funcion*/}
    </div>
  );
};

export default ItemProductStore;
