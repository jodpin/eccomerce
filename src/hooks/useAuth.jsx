// useContext es para acceder a la informacion de
// un context
import { useContext } from "react";

// tambien se importa el provider
import AuthContext from "../context/AuthProvider";


// es recomendable hacer un hook por cada context
const useAuth = () =>{
    // extraemos los valores del context
    return useContext(AuthContext)
}

export default useAuth;