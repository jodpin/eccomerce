import ItemOrder from "../components/ItemOrder";
import useCustomer from "../hooks/useCustomer";

const UserHistory = () => {
  const { orders, loading } = useCustomer();
  console.log(orders);

  return (
    <>
      {loading ? (
        <div>...CARGANDO...</div>
      ) : (
        <div>
          <h1 className="text-2xl md:text-3xl text-center font-bold mb-4">Tus Ordenes</h1>
          {orders?.map((order, index) => (
            <ItemOrder key={order._id} index={index} order={order} />
          ))}
        </div>
      )}
    </>
  );
};

export default UserHistory;
