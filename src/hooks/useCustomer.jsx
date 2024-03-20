import { useContext } from "react";

import CustomerContext from "../context/CustomerProvider";

// es recomendable hacer un hook por cada context
const useCustomer = () => {
  // extraemos los valores del context
  return useContext(CustomerContext);
};

export default useCustomer;
