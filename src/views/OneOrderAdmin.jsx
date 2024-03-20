import { useEffect } from "react";
import useAdmin from "../hooks/useAdmin";
import { useParams } from "react-router-dom";
import ItemProductCartAdmin from "../components/ItemProductCartAdmin";
import { FormatDate } from "../helpers/FormatDate";

const OneOrderAdmin = () => {
  const { id } = useParams();

  const { orders, setCart, cart, order, setOrder, editOrderOfUser } =
    useAdmin();

  useEffect(() => {
    // cuando use una state no se actualizaba el estado de order, entonces mejor
    // use una variable simple y seteamos despues de encontrar el elemento.
    const delivery = orders?.find((el) => el._id == id);
    setOrder(delivery);
    if (delivery != undefined) {
      setCart(delivery.cart);
    }
  }, []);

  function total() {
    let suma = 0;
    cart?.map((product) => (suma += product.quantity * product.precio));
    return suma;
  }

  return (
    <div className="p-5 m-5">
      <h1 className="text-center md:text-left text-xl md:text-2xl font-bold">INFORMACIÓN DE PEDIDO</h1>
      <div className="flex flex-col md:flex-row md:justify-between lg:justify-around md:items-center my-4">
        <p className="text-xl md:text-2xl text-left">
          TOTAL: <span className="font-bold uppercase">{total()}</span>
        </p>
        {order?.date && (
          <p className="text-xl md:text-2xl text-left">
            FECHA:{" "}
            <span className="font-bold">
              {FormatDate(order.date)}
            </span>
          </p>
        )}

        <button className="rounded inline-block p-2 mb-2  font-bold bg-red-500 hover:bg-gray-700  text-white">
          Eliminar Pedido
        </button>

        <button
          className="rounded inline-block p-2 font-bold bg-sky-600 hover:bg-gray-700  text-white"
          onClick={editOrderOfUser}
        >
          Enviar Cambios
        </button>
      </div>

      <div>
        {cart?.map((item, index) => (
          <ItemProductCartAdmin
            index={index + 1}
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default OneOrderAdmin;
