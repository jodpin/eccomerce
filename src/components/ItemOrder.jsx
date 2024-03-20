import { FormatDate } from "../helpers/FormatDate";
import { useNavigate } from "react-router-dom";
const ItemOrder = ({ order, index }) => {
  const { date, cart, _id } = order;
  const navigate = useNavigate();

  const total = () => {
    let suma = 0;
    cart.forEach((el) => {
      suma += el.quantity * el.precio;
    });
    return suma;
  };

  const goToOneOrder = () => {
    navigate(`/Productos/Historial/${_id}`);
  };
  return (
    <div className="px-2 lg:w-3/4 flex md:justify-center border-2 h-14 rounded items-center mb-3 md:ml-10">
      <h3 className="text-sm md:text-lg font-bold">{index + 1}.</h3>
      <p className="text-sm md:text-lg inline-block w-98 px-5 font-bold">
        {FormatDate(date)}
      </p>
      <p className="text-sm md:text-lg inline-block w-48 px-5 font-bold truncate">
        Total: {total()}
      </p>
      <button
        onClick={goToOneOrder}
        className=" text-sm md:text-lg rounded inline-block p-2 w-32 font-bold bg-cyan-500 hover:bg-gray-700  text-white"
      >
        ver
      </button>
    </div>
  );
};

export default ItemOrder;
