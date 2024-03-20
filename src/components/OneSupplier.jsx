import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const OneSupplier = ({ supplier }) => {
  const { _id, nit, nombre, correo, direccion, telefono } = supplier;

  const { deleteSupplier, setSupplierToEdit } = useAdmin();
  const navigate = useNavigate();

  const goToEdit = () => {
    setSupplierToEdit(supplier);
    navigate("nuevo-proveedor");
  };

  return (
    <div className="md:w-full m-2 p-2 flex flex-col gap-1 border-2 rounded md:items-center mb-5">
      <h3 className="inline-block w-28 md:text-lg md:font-bold">
        <span className="font-bold md:hidden">Nit:</span>
        {nit}.
      </h3>
      <p className=" md:text-lg inline-block w-32 md:px-5 md:font-bold">
        <span className="font-bold md:hidden">Nombre: </span>
        {nombre}
      </p>
      <p className=" inline-block w-64 md:text-lg md:text-center md:font-bold">
        <span className="font-bold md:hidden">Correo: </span>
        {correo}
      </p>
      <p className=" inline-block w-64 md:text-lg md:text-center md:font-bold">
        <span className="font-bold md:hidden">Dir: </span>
        {direccion}
      </p>
      <h4 className="  md:text-lg inline-block w-32 text-left md:px-2 md:font-bold ">
        <span className="font-bold md:hidden">Telefono: </span>
        {telefono}
      </h4>
      <button
        onClick={() => goToEdit()}
        className="rounded inline-block p-2  font-bold bg-gray-500 hover:bg-gray-700  text-white"
      >
        Editar
      </button>
      <button
        onClick={() => deleteSupplier(_id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Eliminar
      </button>
    </div>
  );
};

export default OneSupplier;
