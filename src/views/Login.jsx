import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        msg: "todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlert({});
    try {
      const { data } = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("token", data.token);

      setAuth(data);
      console.log("revisando error");
      navigate("/productos");
      setAlert({});
    } catch (error) {
      setAlert({ msg: error.response.data.msj, error: true });
    }
  };

  const { msg } = alert;

  return (
    <div>
      {/* capitalize convierte la primera letra en mayuscula */}
      <h1 className="text-gray-500 text-center font-black text-5xl capitalize">
        Inicia sesion en <span className="text-orange-400">Mercaya</span>
      </h1>

      {msg && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg py-10 px-10"
        onSubmit={handleSubmit}
      >
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
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar sesion"
          className="bg-orange-500 mb-5 w-full py-3 text-white uppercase bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="registro"
          className="block text-center my-5 text-slate-500 text-sm "
        >
          ¿No tienes una cuenta? Registrate.
        </Link>
        <Link
          to="olvide-contraseña"
          className="block text-center my-5 text-slate-500 text-sm"
        >
          Olvide mi password
        </Link>
      </nav>
    </div>
  );
};

export default Login;
