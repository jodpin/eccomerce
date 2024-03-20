import { useNavigate } from "react-router-dom";
import ItemProductAdmin from "../components/itemProductAdmin";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";
// import { useEffect, useState } from "react";

const ProductsAdmin = () => {
  const { products, setProductToEdit, getProducts } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const goToCreateProduct = () => {
    setProductToEdit({});
    navigate("nuevo-producto");
  };

  return (
    <div className="">
      <div className="mb-10 mx-3 w-full flex justify-center md:block">
        <button
          onClick={goToCreateProduct}
          className="bg-gray-500 p-2 rounded text-white font-bold"
        >
          Crear Nuevo Producto
        </button>
      </div>

      <div className="flex flex-col justify-center w-full" id="product-list">
        {products?.map((product) => (
          <ItemProductAdmin
            key={product._id}
            id={product._id}
            product={product}
          ></ItemProductAdmin>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;
