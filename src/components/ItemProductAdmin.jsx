import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const ItemProductAdmin = ({ product }) => {
  const {
    _id,
    codigo,
    nombre,
    categoria,
    precioCompra,
    precioVenta,
    imagen,
    posicion,
  } = product;
  const { url } = imagen;
  const { setProductToEdit, deleteProduct } = useAdmin();
  const navigate = useNavigate();

  const setDataToEdit = () => {
    setProductToEdit(product);
    navigate("nuevo-producto");
  };

  return (
    <div className="border-2 rounded m-3 md:flex">
      <div className="flex-1 p-2 h-14 flex gap-2 items-center">
        <h3 className="font-bold inline-block w-12 ">{codigo}.</h3>
        <p className="md:text-lg text-ellipsis whitespace-pre w-48 font-bold">{nombre}</p>

        <img
          className="h-full rounded "
          src={url}
          width="50px"
          height="50px"
          alt="imagen"
        />

        <p className=" inline-block w-28 md:text-lg text-center font-bold">
          {categoria}
        </p>
        <p className=" inline-block w-28 md: text-center font-bold">
          {posicion}
        </p>
      </div>
      <hr className="mx-2" />
      <div className="flex-1 p-2 h-14 flex gap-2 items-center justify-evenly">
        <h4 className="  md: inline-block w-24 text-right px-2 font-bold ">
          {"$" + precioCompra}
        </h4>

        <h4 className="  md: inline-block w-24 text-right px-2 font-bold ">
          {"$" + precioVenta}
        </h4>

        <button
          onClick={() => setDataToEdit(product)}
          className="rounded inline-block p-2  font-bold bg-gray-500 hover:bg-gray-700  text-white"
        >
          Editar
        </button>
        <button
          onClick={() => deleteProduct(_id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>

      {/* al pasarle por parametro el id en el hijo, lo enviamos al padre donde esta definida la funcion*/}
    </div>
  );
};

export default ItemProductAdmin;
