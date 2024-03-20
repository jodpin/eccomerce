import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import useAdmin from "../hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM = {
  nit: "",
  nombre: "",
  direccion: "",
  telefono: "",
  posicion: "",
  correo: "",
};

const NewSupplier = () => {
  const [form, setForm] = useState(INITIAL_FORM);

  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const { supplierToEdit, createSupplier, editSupplier } = useAdmin();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Evaluamos si la variable que contiene la informacion para editar
    // contiene algun elemento y de esa manera colocar esa informacion
    // en el formulario
    if (Object.keys(supplierToEdit).length > 0) {
      setForm(supplierToEdit);
    }
  }, [supplierToEdit]);

  // envio de la solicitud
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (supplierToEdit.nombre) {
      console.log(supplierToEdit);

      const data = await editSupplier(form);
      console.log(data);
      return;
    }

    Object.entries(form).forEach(([key, value]) => {
      if (value === "") {
        console.log("dentro");
        setAlert({
          msg: "todos los campos son obligatorios",
          error: true,
        });
        return;
      }
    });

    setLoading(true);
    try {
      const data = await createSupplier(form);
      console.log(data);
      setAlert({ msg: data.message });
      setLoading(false);
      setTimeout(() => {
        navigate("/admin/proveedores");
      }, 5000);
    } catch (error) {
      setAlert({ msg: error.message, error: true });
    }
  };

  const { msg } = alert;
  return (
    <div className="lg:w-96">
      <h3 className="text-gray-500 text-center font-black text-3xl capitalize">
        proveedor
      </h3>

      <form onSubmit={handleSubmit} className="p-2">
        <div className="my-5">
          <label
            htmlFor="nit"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nit
          </label>
          <input
            id="nit"
            type="text"
            name="nit"
            value={form.nit}
            onChange={(e) => handleChange(e)}
            placeholder="Nit del proveedor"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
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
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Direccion
          </label>
          <input
            id="direccion"
            name="direccion"
            value={form.direccion}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Direccion del producto"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="telefono"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Telefono
          </label>
          <input
            id="telefono"
            name="telefono"
            value={form.telefono}
            onChange={(e) => handleChange(e)}
            type="Number"
            placeholder="telefono"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            id="correo"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="correo"
            name="correo"
            value={form.correo}
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder="Email del proveedor"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        {loading && (
          <div className="my-5">
            <p
              className="uppercase text-sky-700 block text-xl font-bold"
              htmlFor="file_input"
            >
              ...Enviando informacion...
            </p>
          </div>
        )}

        {msg && <Alert alert={alert} />}
        <input
          type="submit"
          value={supplierToEdit.name ? "Editar Proveedor" : "Crear Proveedor"}
          className="bg-orange-500 my-5 mb-5 w-full py-3 text-white uppercase bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </div>
  );
};

export default NewSupplier;
