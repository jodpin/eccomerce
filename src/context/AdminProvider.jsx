import { useState, createContext } from "react";
import axios from "axios";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [supplierToEdit, setSupplierToEdit] = useState({});
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({});
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});

  // Para agregar y editar productos usamos la misma funcion
  // con condicional pero lo ideal y lo que vamos a hacer con los proveedores es
  // manejar las funciones a parte

  function addToCart(product) {
    console.log("estamos en la funcion");
    let productInCart = cart?.find(
      (productInCart) => product.id === productInCart.id
    );

    productInCart
      ? setCart(
          cart?.map((el) =>
            el.id === productInCart.id
              ? { ...el, quantity: el.quantity + 1 }
              : el
          )
        )
      : setCart([...cart, { ...product, quantity: 1 }]);
  }

  function deleteFromCart(id) {
    const kart = cart.filter((product) => product.id != id);
    setCart(kart);
  }

  function increaseQuantity(id) {
    const kart = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCart(kart);
  }

  function decreaseQuantity(product) {
    if (product.quantity > 1) {
      setCart(
        cart.map((el) =>
          el.id === product.id ? { ...el, quantity: el.quantity - 1 } : el
        )
      );
    } else {
      setCart(cart.filter((el) => el.id !== product.id));
    }
  }

  const createProduct = async (formData) => {
    if (productToEdit.nombre) {
      console.log("editando");
      try {
        const { data } = await axios({
          method: "put",
          url: `${import.meta.env.VITE_BACKEND_URL}/products/${
            productToEdit._id
          }`,
          data: formData,
          headers: { "Content-Type": "application/json" },
        });
        console.log(data);
        return { data };
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("estamos aqui");
      try {
        const { data } = await axios({
          method: "post",
          url: `${import.meta.env.VITE_BACKEND_URL}/products`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(data);
        return { data };
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getProducts = async () => {
    // con la cabecera del BEARER
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // Con axion es obligatorio usar data porque es destructurando la propiedad de la respuesta
      // que trae ese nombre, si usamos otro nombre entonces hay que hacer mas pasos
      const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/products`, config);
      setProducts(data);
      console.log(data);
    } catch (error) {
      // para setear auth en vacio cuando expire el token
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    console.log(id);

    try {
      await axios({
        method: "delete",
        url: `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
      });
      const arrayProducts = products.filter((el) => el._id != id);
      setProducts(arrayProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // PROVEEDORES

  const createSupplier = async (form) => {
    console.log(form);

    const { data } = await axios({
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/supplier`,
      data: form,
      headers: { "Content-Type": "application/json" },
    });

    return data;
  };

  const editSupplier = async (form) => {
    try {
      const { data } = await axios({
        method: "put",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/supplier/${
          supplierToEdit._id
        }`,
        data: form,
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      return error;
    }
  };

  const getSuppliers = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/supplier`,
        config
      );
      setSuppliers(data);
    } catch (error) {
      console.log(error);
    }

    return suppliers;
  };

  const deleteSupplier = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/supplier/${id}`,
      });
      const arraySuppliers = suppliers.filter((el) => el._id != id);
      setSuppliers(arraySuppliers);
    } catch (error) {
      console.log(error);
    }
  };

  // USUARIOS
  const getOneUser = async (documento) => {
    setAlert({});
    // setUser({})
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no tiene los permisos");
      return;
    }

    try {
      const { data } = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BACKEND_URL}/users/${documento}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data.user);
      setOrders(data.orders);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  const editOrderOfUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no tienes los permisos");
      return;
    }

    setTimeout(async () => {
      const { data } = await axios({
        method: "put",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/order/${order._id}`,
        data: cart,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      // setOrders([...orders, data]);
    }, 5000);
  };

  return (
    <AdminContext.Provider
      value={{
        getProducts,
        products,
        setProducts,
        productToEdit,
        setProductToEdit,
        createProduct,
        deleteProduct,
        createSupplier,
        getSuppliers,
        suppliers,
        supplierToEdit,
        setSupplierToEdit,
        deleteSupplier,
        editSupplier,
        getOneUser,
        user,
        orders,
        alert,
        addToCart,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        cart,
        setCart,
        order,
        setOrder,
        editOrderOfUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider };

export default AdminContext;
