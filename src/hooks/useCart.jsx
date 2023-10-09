// useContext es para acceder a la informacion de
// un context
import { useContext } from "react";

// tambien se importa el provider
import handlerCartContext from "../context/HandlerCartProvider";

// es recomendable hacer un hook por cada context
const useCart = () => {
  // extraemos los valores del context
  return useContext(handlerCartContext);
};

export default useCart;
