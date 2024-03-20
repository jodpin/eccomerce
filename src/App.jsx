import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import Store from "./views/Store";
import { AuthProvider } from "./context/AuthProvider";
import { HandlerCartProvider } from "./context/HandlerCartProvider";
import { AdminProvider } from "./context/AdminProvider";
import { CustomerProvider } from "./context/CustomerProvider";

import ProtectedLayout from "./layout/ProtectedLayout";
import Cart from "./views/Cart";
import ProductsAdmin from "./views/ProductsAdmin";
import NewProduct from "./views/NewProduct";
import AdminSupplier from "./views/AdminSupplier";
import NewSupplier from "./views/NewSupplier";
import UserHistory from "./views/UserHistory";
import OneOrder from "./views/OneOrder";
import SearchUser from "./views/SearchUser";
import OneOrderAdmin from "./views/OneOrderAdmin";

function App() {
  return (
    <BrowserRouter>
      <HandlerCartProvider>
        <AuthProvider>
          <AdminProvider>
            <CustomerProvider>
              <Routes>
                <Route element={<AuthLayout />} path="/">
                  <Route index element={<Login />} />
                  <Route path="registro" element={<Register />} />
                </Route>

                <Route path="/Productos/" element={<ProtectedLayout />}>
                  <Route index element={<Store />} />
                  <Route path="Carrito" element={<Cart />} />
                  <Route path="Historial" element={<UserHistory />} />
                  <Route path="Historial/:id" element={<OneOrder />} />
                </Route>

                <Route path="/admin/" element={<ProtectedLayout />}>
                  <Route index element={<ProductsAdmin />} />
                  <Route path="nuevo-producto" element={<NewProduct />} />
                  <Route path="proveedores" element={<AdminSupplier />} />
                  <Route
                    path="proveedores/nuevo-proveedor"
                    element={<NewSupplier />}
                  />
                  <Route path="usuario" element={<SearchUser />} />
                  <Route path="usuario/:id" element={<OneOrderAdmin />} />
                </Route>
              </Routes>
            </CustomerProvider>
          </AdminProvider>
        </AuthProvider>
      </HandlerCartProvider>
    </BrowserRouter>
  );
}

export default App;
