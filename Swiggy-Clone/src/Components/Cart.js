import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [cartItems, setCartItems] = useState(cart?.addedItems || []);
  return cartItems.length === 0 ? (
    <div className="m-auto">
      <img
        className="m-auto w-[500px] mt-4"
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
      />
      
        <span className="flex justify-center   text-gray text-3xl mt-10 font-bold ">
          Your cart is empty{" "}
        </span>
        <span className="flex justify-center   text-gray mt-4">
          You can go to home page to view more restaurants
        </span>
        <Link to="/">
        <button className="flex justify-center m-auto mt-4 border px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-orange text-md rounded-md hover:bg-orange hover:text-white transition ease-linear duration-500">
          SEE RESTAURANTS NEAR YOU
        </button>
        </Link>
    </div>
  ) : (
    <div>
      {cartItems.map((i) => {
        return (
          <div key={i.id}>
            <h1>
              {i.item}: {i.price / 100} * {i.quantity}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
