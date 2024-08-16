import { useState } from "react";

import { Link } from "react-router-dom";
import { useCart } from "../utils/CartContext";

export const HeaderComponent = () => {

  const [loginLogoutString, setLoginLogoutString] = useState("Login");
  const {cartSize} = useCart();
  
  return (
    <div className="flex justify-between bg-orange shadow-lg pt-2 pb-2">
      <div className="w-28 ml-4">
        <Link to="/">
          <img
            className="rounded-full cursor-pointer"
            src={require("../../Public/app-logo.jpeg")}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <ul className="flex justify-between m-4 p-4 ">
          <li className="font-bold text-white px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="font-bold text-white px-4">
            <Link to="/about">About Me</Link>
          </li>
          <li className="font-bold text-white px-4">
            <Link to="/contact">Contact Us</Link>
          </li>

          <li className="font-bold text-white px-4">
            <Link to="/cart">Cart 
            {cartSize > 0 ?   <span className="text-white" > [{cartSize}] </span>  : ''}
           
            </Link>
          </li>
          <button
            onClick={() =>
              setLoginLogoutString(
                loginLogoutString === "Login" ? "Logout" : "Login"
              )
            }
            className="font-bold text-white login-button"
          >
            {loginLogoutString}
          </button>
        </ul>
      </div>
    </div>
  );
};
