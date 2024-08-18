import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../utils/CartContext";

import CDN_URL from "../utils/constant";
import { EmptyCart } from "./EmptyCart";
import ConfirmationModal from "../utils/ConfirmationModal";
const Cart = () => {
  // retrieving the cart items from localStorage on render
  const cart = JSON.parse(localStorage.getItem("cart"));

  const [cartItems, setCartItems] = useState(cart?.addedItems || []);
  const total = cartItems?.reduce((count, current) => {
    return count + (current.price / 100) * current.quantity;
  }, 0);
  const [grandTotal, setGrandTotal] = useState(total || 0);
  const [couponCodeText, setCouponCodeText] = useState("");
  const [discountCounter, setDiscountCounter] = useState(0);
  const [discountPrompt, setDiscountPrompt] = useState('Apply Coupon FLAT50 to get 50% off.')
  const [open, setOpen] = useState(false);

  const { dispatch } = useCart();

  // useNavigate hook, provided by react-router for navigating

  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

  // handles the checkout process, clears the cart and navigates to success page confirming order is successfully placed

  // since setting state variables is asynchronous, using call-back function in state setter
  const checkoutHandler = () => {
    dispatch({ type: "CLEAR" });
    setCartItems((prevState) => {
      prevState = [];
      return prevState;
    });
    navigate("/success");
  };

  // clearing the cart

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR" });
    setCartItems((prevState) => {
      prevState = [];
      return prevState;
    });
    setOpen(false);
  };

  // adding items to cart on cart page

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

      return newState;
    });
  };

  // if an item has one quantity, item will be removed from cart, otherwise, item count is decreased by one

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

        return newState;
      });
    }
  };

  //  removes the item from cart, doesn't matter how much item count is
  const removeItemFromCart = (item) => {
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
      return newState;
    });
  };

  const applyCouponHandler = () => {
    if(couponCodeText.toLowerCase() === 'flat50' && discountCounter < 1) {
      setGrandTotal(grandTotal => {
        return grandTotal / 2;
      });
      setDiscountCounter(discountCounter + 1);
      setCouponCodeText('');
      setDiscountPrompt('Coupon Applied!')
    } else {
      setDiscountPrompt('Not applicable!')
    }
  }
  return cartItems.length === 0 ? (
    // showing empty cart page when cart is empty
    <EmptyCart />
  ) : (
    <div className="text-center bg-skin h-full">
      <h1 className="font-bold  text-2xl pt-5">Your Cart</h1>
      <h1 className="font-bold  text-2xl pt-5">{cartItems[0]?.resName}</h1>
      <div className="w-10/12 m-auto mt-4 bg-skin p-4  mb-4 rounded shadow-2xl  ">
        {cartItems.map((i) => {
          return (
            <div className="m-4 p-4 flex justify-between " key={i.id}>
              <h1 className="w-[40%]  flex font-bold text-xl">{i.item}</h1>
              <div className="container-cart  ">
                <img
                  className="w-28 rounded-lg"
                  src={
                    i.imageId
                      ? CDN_URL + i.imageId
                      : require("../../Public/default-image.jpeg")
                  }
                />

                <div className=" btn-cart left-[86%] flex items-center justify-between w-24 p-1 shadow-xl rounded-lg text-white bg-orange">
                  <span
                    onClick={() => removeHandler(i)}
                    className="px-1 cursor-pointer"
                  >
                    −
                  </span>
                  <span>{i.quantity}</span>
                  <span
                    onClick={() => addHandler(i)}
                    className="px-1 cursor-pointer"
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="w-[10%] h-1">
                <button
                  onClick={() => removeItemFromCart(i)}
                  className="hover:bg-orange bg-white py-1 px-4 rounded hover:text-white text-orange font-bold transition duration-500"
                >
                  Remove Item
                </button>
              </div>
              <p className="w-[20%] text-xl">
                ₹{((i.price / 100).toFixed(2) * i.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
        <div className=" p-4 m-2 border-orange border-b-2"></div>
        <div className="m-2 p-2 flex justify-between  w-11/12 gap-10">
          <h1 className="m-4 font-semibold text-lg">TO PAY</h1>{" "}
          <h1 className="m-4"> ₹{grandTotal.toFixed(2)}</h1>
        </div>
        <div className="flex justify-end gap-10 mr-9">
          <div className="flex flex-col">
            <input
              className="rounded p-1"
              type="text"
              value={couponCodeText}
              placeholder="Enter coupon code..."
              onChange={(e) => setCouponCodeText(e.target.value)}
            />
            <span className= "flex justify-start text-gray text-xs">
              <i>{discountPrompt}</i>
            </span>
          </div>
          <button
            onClick={applyCouponHandler}
            className="bg-orange hover:bg-white py-1 px-4 rounded text-white hover:text-orange font-bold transition duration-500"
          >
            Apply
          </button>
        </div>
      </div>
      <button
        onClick={checkoutHandler}
        className="m-4 px-7 py-3 md:px-9 md:py-4 hover:shadow-2xl bg-white font-medium md:font-semibold text-orange  text-md rounded-md   transition ease-linear duration-500"
      >
        Checkout
      </button>
      <button
        onClick={() => setOpen(true)}
        className="m-4  px-7 py-3 md:px-9 md:py-4 hover:shadow-2xl bg-orange font-medium md:font-semibold text-white  text-md rounded-md   transition ease-linear duration-500"
      >
        Clear Cart
      </button>

      <ConfirmationModal
        open={open}
        onClose={handleClose}
        onConfirm={clearCartHandler}
        title="Confirmation"
        message="Are you sure you want to clear the cart items?"
      />
    </div>
  );
};

export default Cart;
