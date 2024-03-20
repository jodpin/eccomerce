import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import Alert from "../components/Alert";
import ItemOrderAdmin from "../components/ItemOrderAdmin";

const SearchUser = () => {
  const [documento, setDocumento] = useState("");

  const { getOneUser, user, orders, alert } = useAdmin();

  const { nombre, apellido, tipo_documento, telefono, email, direccion } = user;

  console.log(orders);
  console.log(user);
  const handleChange = (e) => {
    setDocumento(e.target.value);
  };

  const searchUser = async (e) => {
    e.preventDefault();
    await getOneUser(documento);
  };

  const { msg } = alert;
  return (
    <div className="w-full min-h-screen px-10">
      <h2 className="text-3xl text-center font-bold mb-4">Buscar usuario</h2>
      <form className="mt-10">
        <div className="flex flex-col">
          <label htmlFor="di" className="uppercase block text-xl font-bold">
            Documento del cliente
          </label>
          <input
            type="text"
            id="di"
            value={documento}
            onChange={(e) => handleChange(e)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Documento del usuario"
          />
          <div className="w-full flex justify-center">
            <input
              type="submit"
              value={"Buscar Usuario"}
              onClick={searchUser}
              className="bg-orange-500 my-5 mb-5 w-80 py-3 text-white uppercase bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
          </div>
        </div>
      </form>
      {msg && <Alert alert={alert}></Alert>}
      {nombre && (
        <>
          <div>
            <p className="font-bold text-lg uppercase ">
              {nombre} {apellido}
            </p>
            <p className="font-bold text-lg  uppercase ">
              {tipo_documento}
              {": "}
              <span>{documento}</span>
            </p>
            <p className="font-bold text-lg  uppercase ">
              Telefono: {telefono}
            </p>

            <p className="font-bold text-lg  uppercase ">Correo: {email}</p>
            <p className="font-bold text-lg  uppercase ">
              Direccion: <span>{direccion}</span>
            </p>
          </div>
          <div className="w-94">
            <h1 className="text-2xl mt-10 font-bold mb-4">
              Historial del usuario
            </h1>
            <div className="">
              {orders?.map((order, index) => (
                <ItemOrderAdmin key={order._id} index={index} order={order} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchUser;
