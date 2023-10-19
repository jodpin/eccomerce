import { useEffect } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  });

  return (
    <>
      <Header />
      <main className="container mx-auto mt-5 p-5 md:flex md:justify-center">
        <div className="w-3/4">
          {/* Este outlet lo que hace es permitir 
          que se muestre los elementos envueltos en este componente */}
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default ProtectedLayout;
