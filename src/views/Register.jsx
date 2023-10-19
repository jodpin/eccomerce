import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const IDENTIDAD = [
  "Cedula de ciudadania",
  "Cedula de extranjeria",
  "Pasaporte",
];

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");
  const [tipo_documento, setTipo_documento] = useState("");
  const [documento, setDocumento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [alert, setAlert] = useState({});
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(auth).length === 0) navigate("/registro");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        nombre,
        apellido,
        email,
        telefono,
        edad,
        tipo_documento,
        documento,
        direccion,
        password,
        repeatPassword,
      ].includes("")
    ) {
      setAlert({
        msg: "todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password != repeatPassword) {
      setAlert({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: "Seguridad de contraseña muy debil, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlert({});
    try {
      const { data } = await axios.post("http://localhost:3001/users", {
        nombre,
        apellido,
        email,
        telefono,
        edad,
        tipo_documento,
        documento,
        direccion,
        password,
        repeatPassword,
        admin: false,
      });

      setAlert({
        msg: data.msg,
        error: false,
      });

      // setRepeatPassword("");
      // setNombre("");
      // setApellido("");
      // setDireccion("");
      // setTipo_documento("");
      // setDocumento("");
      // setEdad("");
      // setTelefono("");
      // setEmail("");
      // setPassword("");
      console.log(data);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="text-gray-500 text-center font-black text-5xl capitalize">
        Registrate y empieza a disfrutar de {""}
        <span className="text-orange-400"> Mercaya</span>
      </h1>

      <form
        className="my-5 bg-white shadow rounded-lg py-5 px-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
            // el htmlFor lo que hace es que
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="apellido"
            // el htmlFor lo que hace es que
          >
            Apellido
          </label>
          <input
            id="apellido"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Tu apellido"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
            // el htmlFor lo que hace es que
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="telefono"
            // el htmlFor lo que hace es que
          >
            Telefono
          </label>
          <input
            id="telefono"
            type="Text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Tu telefono"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="edad"
          >
            Edad
          </label>
          <input
            id="edad"
            type="Number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Tu edad"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="tipo_documento"
            // el htmlFor lo que hace es que
          >
            Tipo documento
          </label>
          <select
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="text"
            id="tipo_documento"
            placeholder="tipo documento"
            value={tipo_documento}
            onChange={(e) => setTipo_documento(e.target.value)}
          >
            <option>--seleccionar--</option>
            {IDENTIDAD.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="documento"
            // el htmlFor lo que hace es que
          >
            Numero Documento
          </label>
          <input
            id="documento"
            type="Number"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Tu Identificación"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="direccion"
            // el htmlFor lo que hace es que
          >
            Dirección
          </label>
          <input
            id="direccion"
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Tu Dirección"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            // el htmlFor lo que hace es que
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            // el htmlFor lo que hace es que
          >
            Confirma contraseña
          </label>
          <input
            id="password2"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="repite tu contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Crear cuenta"
          className="bg-orange-500 mb-5 w-full py-3 text-white uppercase bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
        {msg && <Alert alert={alert} />}
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 text-sm">
          ¿ya tienes una cuenta? Inicia sesion.
        </Link>
        <Link
          to="/olvide-contraseña"
          className="block text-center my-5 text-slate-500 text-sm"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Register;
