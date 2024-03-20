import { useNavigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useEffect } from "react";
import OneSupplier from "../components/OneSupplier";

const AdminSupplier = () => {
  const { suppliers, setSupplierToEdit, getSuppliers } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    getSuppliers();
  }, []);

  const goToCreateSupplier = () => {
    setSupplierToEdit({});
    navigate("nuevo-proveedor");
  };

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <button
          onClick={goToCreateSupplier}
          className="bg-gray-500 p-2 rounded text-white font-bold"
        >
          Crear Nuevo Proveedor
        </button>
      </div>

      <div className="flex flex-col justify-center w-full" id="product-list">
        {suppliers?.map((supplier) => (
          <OneSupplier key={supplier._id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
};

export default AdminSupplier;
