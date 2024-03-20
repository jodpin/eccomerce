import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  useEffect(() => {
    getOrders();
  }, []);

  const createOrder = async (cart) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no tienes los permisos");
      return;
    }

    setTimeout(async () => {
      const { data } = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/order`,
        data: cart,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders([...orders, data]);
    }, 5000);
  };

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no tiene los permisos");
      return;
    }

    const { data } = await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/order`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setOrders(data);
  };

  const getOneOrder = async (id) => {
    setOrder({});
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no tiene los permisos");
      return;
    }

    const { data } = await axios({
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/order/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setOrder(data);
    console.log(data);
  };
  return (
    <CustomerContext.Provider
      value={{
        orders,
        setOrders,
        createOrder,
        getOrders,
        getOneOrder,
        order,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerProvider };

export default CustomerContext;
