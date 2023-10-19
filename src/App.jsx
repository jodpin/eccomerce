import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import Store from "./views/Store";
import { AuthProvider } from "./context/AuthProvider";
import { HandlerCartProvider } from "./context/HandlerCartProvider";

import ProtectedLayout from "./layout/ProtectedLayout";
import Cart from "./views/Cart";
import ProductsAdmin from "./views/ProductsAdmin";
import NewProduct from "./views/NewProduct";

function App() {
  return (
    <BrowserRouter>
      <HandlerCartProvider>
        <AuthProvider>
          <Routes>
            <Route element={<AuthLayout />} path="/">
              <Route index element={<Login />} />
              <Route path="registro" element={<Register />} />
            </Route>

            <Route path="/productos/" element={<ProtectedLayout />}>
              <Route index element={<Store />} />
              <Route path="Carrito" element={<Cart />} />
            </Route>

            <Route path="/admin/" element={<ProtectedLayout />}>
              <Route index element={<ProductsAdmin />} />
              <Route path="nuevo-producto" element={<NewProduct />} />
            </Route>
          </Routes>
        </AuthProvider>
      </HandlerCartProvider>
    </BrowserRouter>
  );
}

export default App;
