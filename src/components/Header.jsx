import { Link } from "react-router-dom";
import car from "../images/carrito.png";

const Header = () => {
  return (
    <header className="w-100">
      <div className=" p-2 flex justify-between bg-orange-400">
        <h2 className="pl-3 font-bold text-4xl text-white">MercaYa</h2>

        <div className="flex items-center gap-4">
          <Link className="text-white hover:text-cyan-700" to="/Registro">
            Registrarse
          </Link>
          <Link className="text-white hover:text-cyan-700" to="/">
            Iniciar Sesion
          </Link>
          <Link className="text-white hover:text-cyan-700" to="/Productos">
            Productos
          </Link>

          <Link to="carrito">
            <img
              className=" cursor-pointer"
              height="30px"
              width="30px"
              src={car}
              alt=""
            />
          </Link>

          <button
            type="button"
            className="text-orange-400 text-sm bg-white p-2 rounded-md uppercase font-bold"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
