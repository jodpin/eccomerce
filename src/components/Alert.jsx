

const Alert = ({ alert }) => {
  return (
    <>
      <p
        className={` ${
          alert.error ? "bg-red-500" : "bg-sky-600"
        } text-center p-3 rounded-xl uppercase text-white font-bold text-sm mt-10`}
      >
        {alert?.msg}
      </p>
    </>
  );
};

export default Alert;
