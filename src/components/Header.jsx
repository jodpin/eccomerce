import { Link } from "react-router-dom";
import car from "../images/carrito.png";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const { cart } = useCart();
  const { auth, cerrarSesion } = useAuth();
  const [showMenu, setShowMenu] = useState(true);

  function handleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <header className="w-full">
      <nav className="w-full relative bg-orange-400 p-2 flex justify-between items-center h-16">
        <h2 className="text-3xl font-bold md:text-4xl text-white sm:ml-5 md:ml-10">
          MercaYa
        </h2>
        <div className="md:flex md:bg-orange-400 md:justify-evenly md:flex-row md:static md:ml-16 md:gap-2">
          {auth.admin ? (
            <>
              {showMenu && (
                <div className="absolute w-full left-0 top-16 flex flex-col bg-orange-300 md:hidden">
                  <Link
                    onClick={handleMenu}
                    className="mx-5 text-center text-white h-10 leading-10 hover:text-cyan-700 bg-orange-300  md:bg-orange-400"
                    to="/admin/"
                  >
                    Productos
                  </Link>

                  <Link
                    onClick={handleMenu}
                    className="mx-5 text-center text-white h-10 leading-10 hover:text-cyan-700 bg-orange-300  md:bg-orange-400"
                    to="/admin/proveedores"
                  >
                    Proveedores
                  </Link>

                  <Link
                    onClick={handleMenu}
                    className="mx-5 text-center text-white h-10 leading-10 hover:text-cyan-700 bg-orange-300  md:bg-orange-400"
                    to="/admin/usuario"
                  >
                    Usuarios
                  </Link>
                </div>
              )}

              <div className="hidden md:flex md:items-center">
                <p className="text-white font-bold mx-4">Vista Administrador</p>{" "}
                <Link
                  className="text-white w-full hover:text-cyan-700"
                  to="/admin/"
                >
                  Productos
                </Link>
                <Link
                  className="text-white mr-3 hover:text-cyan-700"
                  to="/admin/proveedores"
                >
                  Proveedores
                </Link>
                <Link
                  className="text-white w-full hover:text-cyan-700"
                  to="/admin/usuario"
                >
                  Usuarios
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* este header es de version movil */}

              {showMenu && (
                <div className="absolute w-full left-0 top-16 flex flex-col bg-orange-300 md:hidden">
                  <Link
                    onClick={handleMenu}
                    className="mx-5 text-center text-white h-10 leading-10 hover:text-cyan-700 bg-orange-300  md:bg-orange-400"
                    to="/Productos"
                  >
                    Productos
                  </Link>

                  <Link
                    onClick={handleMenu}
                    className="mx-5 text-center text-white h-10 leading-10 hover:text-cyan-700 bg-orange-300  md:bg-orange-400"
                    to="/Productos/Historial"
                  >
                    Historial
                  </Link>

                  <Link
                    onClick={handleMenu}
                    to="carrito"
                    className="mx-5 flex justify-center items-center bg-orange-300  md:bg-orange-400"
                  >
                    <img
                      className="text-center cursor-pointer"
                      height="30px"
                      width="30px"
                      src={car}
                      alt=""
                    />
                    <span className="text-sm text-white  h-10 font-bold">
                      {cart?.length > 0 ? cart.length : ""}
                    </span>
                  </Link>
                </div>
              )}

              {/* header version pc */}
              <div className="hidden md:flex">
                <Link
                  onClick={handleMenu}
                  className="mx-5 text-center text-white h-10 leading-10 hover:text-cyan-700 bg-orange-300  md:bg-orange-400"
                  to="/Productos"
                >
                  Productos
                </Link>

                <Link
                  onClick={handleMenu}
                  className="mx-5 text-center text-white h-10 leading-10 hover:text-cyan-700 bg-orange-300  md:bg-orange-400"
                  to="/Productos/Historial"
                >
                  Historial
                </Link>

                <Link
                  onClick={handleMenu}
                  to="carrito"
                  className="mx-5 flex justify-center items-center bg-orange-300  md:bg-orange-400"
                >
                  <img
                    className="text-center cursor-pointer"
                    height="30px"
                    width="30px"
                    src={car}
                    alt=""
                  />
                  <span className="text-sm text-white  h-10 font-bold">
                    {cart?.length > 0 ? cart.length : ""}
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-evenly px-1">
          <button
            onClick={() => cerrarSesion()}
            type="button"
            className="text-orange-400 text-sm h-8 md:h-10 bg-white w-32 rounded-md uppercase font-bold"
          >
            Cerrar Sesión
          </button>
          <svg
            onClick={handleMenu}
            id="button-menu"
            className=" md:hidden"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="#777"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 18L20 18"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M4 12L20 12"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </nav>
    </header>
  );
};

export default Header;
