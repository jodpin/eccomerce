import React from "react";
import { Link } from "react-router-dom";

const ProductsAdmin = () => {
  return (
    <div>
      <Link to="nuevo-producto" className="bg-gray-500 p-2 rounded text-white font-bold">Crear Nuevo Producto</Link>
       
    </div>
  );
};

export default ProductsAdmin;
