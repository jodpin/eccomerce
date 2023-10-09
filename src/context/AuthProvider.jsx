import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

// ponemos children porque va a tener como children todos los
// componentes que va a rodear

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  // cuando se hace el llamado para comprobar la auenticacion
  // este hook empieza en true
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // cuando se reinicia la aplicacion se borra el objeto
  // contenido en la variable AUTH; pero podemos revisar el
  // localStorage y si hay token hacemos un llamado hacia
  // la API
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");

      console.log("estamos desde el provider");
      if (!token) {
        navigate("/");
        setLoading(false);
        return;
      }

      // en la solicitud del backend pasamos el token
      // con la cabecera del BEARER
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        console.log("antes del users profile")
        const { data } = await axios("http://localhost:3001/users/profile", config);
        setAuth(data);
        navigate("/productos");
      } catch (error) {
        // para setear auth en vacio cuando expire el token
        setAuth({});
      } finally {
        setLoading(false);
      }
    };
    authUser();
  }, []);

  // lo que se ponga dentro de return es aquello a lo
  // que se puede acceder desde afuera
  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
