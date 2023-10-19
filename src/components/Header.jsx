import { Link } from "react-router-dom";
import car from "../images/carrito.png";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cart } = useCart();
  const { auth, cerrarSesion } = useAuth();

  return (
    <header className="w-100">
      <div className=" p-2 flex justify-between bg-orange-400">
        <h2 className="pl-3 font-bold text-4xl text-white">MercaYa</h2>

        <div className="flex items-center gap-4">
          {auth.admin ? (
            <>
              <p className="text-white font-bold">Vista Administrador</p>
              <Link className="text-white hover:text-cyan-700" to="/admin">
                Productos
              </Link>
              <Link className="text-white hover:text-cyan-700" to="/Productos">
                Proveedores
              </Link>
              <Link className="text-white hover:text-cyan-700" to="/Productos">
                Pedidos
              </Link>
            </>
          ) : (
            <>
              <p className="text-white font-bold">Bienvenido {auth.nombre}</p>
              <Link className="text-white hover:text-cyan-700" to="/Productos">
                Productos
              </Link>

              <Link to="carrito" className="flex">
                <img
                  className=" cursor-pointer"
                  height="30px"
                  width="30px"
                  src={car}
                  alt=""
                />
                <span className="text-sm text-white font-bold">
                  {cart?.length > 0 ? cart.length : ""}
                </span>
              </Link>
            </>
          )}

          <button
            onClick={() => cerrarSesion()}
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
