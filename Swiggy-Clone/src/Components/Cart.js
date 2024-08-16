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
    <div className="text-center bg-skin ">
      <h1 className="font-bold  text-2xl pt-5">Your Cart</h1>
      <h1 className="font-bold  text-2xl pt-5">{cartItems[0]?.resName}</h1>
      <div className="w-6/12 m-auto mt-4 bg-skin p-4  mb-4 rounded shadow-2xl  ">
        {cartItems.map((i) => {
          return (
            <div className="m-4 p-4 flex justify-between  w-full gap-12" key={i.id}>
              <h1 className="w-[80%] flex font-bold text-xl">{i.item}</h1>

              <div className="flex items-center justify-between w-24 p-1 shadow-xl rounded-lg text-white bg-orange">
                <span onClick={() => {}} className="px-1 cursor-pointer">
                  {" "}
                  −{" "}
                </span>
                <span>{i.quantity}</span>
                <span onClick={() => {}} className="px-1 cursor-pointer">
                  +
                </span>
              </div>
              <p className="text-xl">₹{(i.price / 100) * i.quantity}</p>
            </div>
          );
        })}
      </div>
      <button className="m-4  px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-orange text-md rounded-md hover:bg-orange hover:text-white transition ease-linear duration-500">
        Checkout
      </button>
    </div>
  );
};

export default Cart;
