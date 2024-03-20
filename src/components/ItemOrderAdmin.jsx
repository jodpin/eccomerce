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
    navigate(`/admin/usuario/${_id}`);
  };
  return (
    <div className="flex flex-col md:flex-row md:px-2 md:lg:w-3/4   md:border-2 md:h-14 rounded md:items-center mb-3">
      <h3 className="font-bold">{index + 1}.</h3>
      <p className=" text-lg inline-block w-98 md:px-5 font-bold">
        {FormatDate(date)}
      </p>
      <p className=" text-lg inline-block w-48 md:px-5 font-bold truncate">
        Total: {total()}
      </p>
      <button onClick={goToOneOrder} className="rounded inline-block p-2 w-32 font-bold bg-cyan-500 hover:bg-gray-700  text-white">
        ver
      </button>
    </div>
  );
};

export default ItemOrder;
