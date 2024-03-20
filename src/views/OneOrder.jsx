import { useEffect } from "react";
import useCustomer from "../hooks/useCustomer";
import { useParams } from "react-router-dom";

const OneOrder = () => {
  const { id } = useParams();

  const { getOneOrder, order } = useCustomer();

  const { cart } = order;

  useEffect(() => {
    getOneOrder(id);
  }, []);

  function total() {
    let suma = 0;
    cart?.map((product) => (suma += product.quantity * product.precio));
    return suma;
  }

  return (
    <div className="p-5 m-5">
      <h1 className="text-left text-2xl font-bold">Informacion de pedido</h1>
      <div className="flex justify-start lg:justify-around items-left  my-4">
        <p className="text-2xl text-left ">
          TOTAL: <span className="font-bold uppercase">{total()}</span>
        </p>
        <p className="text-2xl text-left ">
          Estado: <span className="font-bold uppercase">Activo</span>
        </p>
      </div>
      <div className="w-full pl-2 flex gap-2 items-center mb-2">
        <p className="font-bold">{"N°"}</p>
        <p className="inline-blocl w-52 md:px-5 font-bold md:text-lg">Nombre</p>
        <p className="font-bold  w-12 md:text-lg md:text-center">Img</p>
        <p className=" inline-block w-12 text-right font-bold md:text-lg">
          Cant.
        </p>
        <p className="inline-block w-32 text-right font-bold md:px-5 md:text-lg">
          Precio
        </p>
       
      </div>
      <div>
        {cart?.length > 0 ? (
          cart?.map((item, index) => (
            <div
              key={index}
              className="w-full pl-2 flex gap-2 border-2 rounded items-center mb-5"
            >
              <h3 className="font-bold">{index + 1}.</h3>
              <p className=" inline-block w-56 px-5 font-bold md:text-lg">
                {item.nombre}
              </p>

              <img
                className="h-full rounded "
                src={item.img}
                width="50px"
                height="50px"
                alt="imagen"
              />

              <p className=" inline-block w-12 text-right font-bold md:text-lg">
                {item.quantity}
              </p>
              <h4 className="inline-block w-32 text-right px-5 font-bold md:text-lg">
                {"$" + item.precio}
              </h4>

            
            </div>
          ))
        ) : (
          <h2 className="text-center">...Cargando informacion</h2>
        )}
      </div>
    </div>
  );
};

export default OneOrder;
