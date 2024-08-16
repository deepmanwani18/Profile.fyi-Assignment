import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [cartItems, setCartItems] = useState(cart?.addedItems || []);
  const total = cartItems?.reduce((count, current) => {
    return count + (current.price / 100) * current.quantity;
  }, 0);
  const [grandTotal, setGrandTotal] = useState(total || 0);

  const { dispatch } = useCart();

  const checkoutHandler = () => {
    dispatch({ type: "CLEAR" });
    setCartItems((prevState) => {
      prevState = [];
      return prevState;
    });
  };

  const addHandler = (item) => {
    dispatch({
      type: "ADD",
      payload: item,
    });
    setCartItems((prevState) => {
      const newState = prevState;
      newState.forEach((n) => {
        if (n.id === item.id) {
          n.quantity++;
        }
      });
      setGrandTotal(
        newState.reduce((count, current) => {
          return count + (current.price / 100) * current.quantity;
        }, 0)
      );
      // setDiscountedPrice((g) => grandTotal / 2);

      return newState;
    });
  };

  const removeHandler = (item) => {
    if (item.quantity === 1) {
      dispatch({
        type: "REMOVE",
        payload: item,
      });
      setCartItems((prevState) => {
        const newState = prevState.filter((n) => {
          return n.id !== item.id;
        });
        setGrandTotal(
          newState.reduce((count, current) => {
            return count + (current.price / 100) * current.quantity;
          }, 0)
        );
        // setDiscountedPrice((g) => grandTotal / 2);

        return newState;
      });
    } else {
      dispatch({
        type: "MINUS",
        payload: item,
      });
      setCartItems((prevState) => {
        const newState = prevState;
        newState.forEach((n) => {
          if (n.id === item.id) {
            n.quantity--;
          }
        });
        setGrandTotal(
          newState.reduce((count, current) => {
            return count + (current.price / 100) * current.quantity;
          }, 0)
        );

        // setDiscountedPrice((g) => grandTotal / 2);

        return newState;
      });
    }
  };
  const handleInput = (e) => {
    setCouponCodeString(e.target.value);
  };
  const applyCouponCode = () => {
    if (couponCodeString.toLowerCase() === "FLAT50".toLowerCase()) {
      setShowDiscountedPrice(true);
      // setDiscountedPrice(grandTotal / 2);
    }
  };
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
            <div
              className="m-4 p-4 flex justify-between  w-full gap-12"
              key={i.id}
            >
              <h1 className="w-[80%] flex font-bold text-xl">{i.item}</h1>

              <div className="flex items-center justify-between w-24 p-1 shadow-xl rounded-lg text-white bg-orange">
                <span
                  onClick={() => removeHandler(i)}
                  className="px-1 cursor-pointer"
                >
                  {" "}
                  −{" "}
                </span>
                <span>{i.quantity}</span>
                <span
                  onClick={() => addHandler(i)}
                  className="px-1 cursor-pointer"
                >
                  +
                </span>
              </div>
              <p className="w-[20%] text-xl">
                ₹{((i.price / 100).toFixed(2) * i.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
        <div className=" p-4 m-2 border-orange border-b-2"></div>
        <div className="m-2 p-2 flex justify-between  w-full gap-12">
          <h1 className="m-4 font-semibold text-lg">TO PAY</h1>{" "}
          <h1 className="m-4"> ₹{grandTotal.toFixed(2)}</h1>
        </div>

        {/* {showDiscountedPrice && (
          <>
            <div className=" p-4 m-2 border-orange border-b-2"></div>
            <div className="m-2 p-2 flex justify-between  w-full gap-12">
              <h1 className="m-4 font-semibold text-lg">TO PAY</h1>{" "}
              <h1 className="m-4"> ₹{discountedPrice.toFixed(2)}</h1>
            </div>{" "}
          </>
        )} */}
      </div>
      {/* <div className="ml-[55%] flex w-[20%] items-center border-b border-orange py-2">
        <div className="flex flex-col gap-1">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray mr-3 py-1 px-2 rounded leading-tight focus:outline-none"
            type="text"
            placeholder="Coupon Code"
            onChange={handleInput}
            value={couponCodeString}
          />
          <span className="flex justify-start text-xs text-gray">
            *Apply coupon &nbsp; <i>FLAT50</i> &nbsp; to get 50% off.
          </span>
        </div>
        <button
          onClick={applyCouponCode}
          className="flex-shrink-0 bg-orange hoverorange border-orange hover:border-orange text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Apply
        </button>
      </div> */}
      <button
        onClick={checkoutHandler}
        className="m-4  px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-orange text-md rounded-md hover:bg-orange hover:text-white transition ease-linear duration-500"
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
