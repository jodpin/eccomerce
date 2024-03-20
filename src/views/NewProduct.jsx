import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/Alert";
import useAdmin from "../hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM = {
  codigo: "",
  nombre: "",
  precioCompra: "",
  precioVenta: "",
  categoria: "",
  // imagen: "",
  posicion: "",
};

const CATEGORIAS = ["aseo", "verduras", "carnes"];
const NewProduct = () => {
  const [imagen, setImagen] = useState({});
  const [form, setForm] = useState(INITIAL_FORM);
  let formData = new FormData();

  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const { productToEdit, createProduct } = useAdmin();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Evaluamos si la variable que contiene la informacion para editar
    // contiene algun elemento y de esa manera colocar esa informacion
    // en el formulario
    if (Object.keys(productToEdit).length > 0) {
      setForm(productToEdit);
    }
  }, [productToEdit]);

  // envio de la solicitud
  const handleSubmit = async (e) => {
    e.preventDefault();

    // evaluamos si hay que editar
    if (Object.keys(productToEdit).length > 0) {
      console.log(Object.keys(productToEdit).length);
      Object.entries(form).forEach(([key, value]) => {
        formData.append(`${key}`, value);
      });

      try {
        const { data } = await createProduct(formData);
        console.log(data.message);
        setAlert({ msg: data.message });
      } catch (error) {
        console.log(error);
        setAlert({ msg: "hubo un error, vuelve a intentarlo", error: true });
        setLoading(false);
      }
      return;
    }

    // en caso de que no sea edicion de un prodcuto entonces es uno nuevo
    Object.entries(form).forEach(([value]) => {
      if (value === "") {
        console.log("todos los campos");
        setAlert({
          msg: "todos los campos son obligatorios",
          error: true,
        });
        return;
      }
    });

    // como vamos a tener un trato diferente con imagen entonces evaluamos
    // por aparte si imagen tiene algo
    if (!imagen.name) {
      setAlert({
        msg: "todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    Object.entries(form).forEach(([key, value]) => {
      formData.append(`${key}`, value);
    });

    formData.append("file", imagen);

    setLoading(true);
    try {
      const { data } = await createProduct(formData);
      console.log(data);
      setAlert({ msg: data.message });
      setTimeout(() => {
        navigate("/admin");
        setAlert({});
      }, 3000);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setAlert({ msg: "hubo un error, vuelve a intentarlo", error: true });
      setLoading(false);
    }
  };

  const { msg } = alert;
  return (
    <div className="lg:w-96">
      <h3 className="text-gray-500 text-center font-black text-3xl capitalize">
        {Object.keys(productToEdit).length === 0
          ? "Nuevo Producto"
          : "Editando Producto"}
      </h3>

      <form onSubmit={handleSubmit} className="p-2">
        <div className="my-5">
          <label
            htmlFor="codigo"
            className="uppercase text-gray-600 block md:text-xl font-bold"
          >
            Codigo
          </label>
          <input
            id="codigo"
            type="text"
            name="codigo"
            value={form.codigo}
            onChange={(e) => handleChange(e)}
            placeholder="Nombre del producto"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block md: font-bold"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Nombre del producto"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="posicion-producto"
            className="uppercase text-gray-600 block md: font-bold"
          >
            Posicion del producto
          </label>
          <input
            id="posicion-producto"
            name="posicion"
            value={form.posicion}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Posicion del producto"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block md: font-bold"
            htmlFor="categoria"
            // el htmlFor lo que hace es que
          >
            Categoria
          </label>
          <select
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            id="categoria"
            name="categoria"
            placeholder="tipo documento"
            value={form.categoria}
            onChange={(e) => handleChange(e)}
          >
            <option>--seleccionar--</option>
            {CATEGORIAS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="my-5">
          <label
            htmlFor="precio-compra"
            className="uppercase text-gray-600 block md: font-bold"
          >
            Precio Compra
          </label>
          <input
            id="precio-compra"
            name="precioCompra"
            value={form.precioCompra}
            onChange={(e) => handleChange(e)}
            type="Number"
            placeholder="Precio compra"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            id="precio-venta"
            className="uppercase text-gray-600 block md: font-bold"
          >
            Precio Venta
          </label>
          <input
            id="precio-venta"
            name="precioVenta"
            value={form.precioVenta}
            onChange={(e) => handleChange(e)}
            type="Number"
            placeholder="Precio venta"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block md: font-bold"
            htmlFor="file_input"
          >
            Cargar imagen
          </label>

          <input
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="imagen"
            type="file"
            accept="image/*"
            // el evento e trae informacion de la imagen cuando la cargamos
            // entre esa info trae un atributo llamado "FILES" que  es un arreglo
            // como solo necesitamos un elemento, usamos en index 0
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </div>
        {loading && (
          <div className="my-5">
            <p
              className="uppercase text-sky-700 block md: font-bold"
              htmlFor="file_input"
            >
              ...Enviando producto...
            </p>
          </div>
        )}

        {msg && <Alert alert={alert} />}
        <input
          type="submit"
          value={productToEdit.nombre ? "Editar Producto" : "Crear Producto"}
          className="bg-orange-500 my-5 mb-5 w-full py-3 text-white uppercase bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </div>
  );
};

export default NewProduct;
