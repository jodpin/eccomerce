import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-3/5">
          {/* Este outlet lo que hace es permitir 
          que se muestre los elementos envueltos en este componente */}
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
