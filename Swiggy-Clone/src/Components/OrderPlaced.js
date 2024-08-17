import { Link } from "react-router-dom";

const OrderPlaced = () => {
  return (
    <div className="m-auto">
      <img
        className="m-auto w-[500px] mt-4"
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2x"
      />

      <span className="flex justify-center   text-gray text-3xl mt-10 font-bold ">
        Your order is placed successfully{" "}
      </span>
      <span className="flex justify-center   text-gray mt-4">
        You can go to home page to view more restaurants
      </span>
      <Link to="/">
        <button className="flex justify-center m-auto mt-4 border px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-orange text-md rounded-md hover:bg-orange hover:text-white transition ease-linear duration-500">
            GO TO HOME
        </button>
      </Link>
    </div>
  );
};

export default OrderPlaced;
