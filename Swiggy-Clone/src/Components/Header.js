import { useState } from "react";

import { Link } from "react-router-dom";
export const HeaderComponent = () => {
  const [loginLogoutString, setLoginLogoutString] = useState("Login");
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
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Me</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>

          <li className="px-4">
            <Link to="/cart">Cart</Link>
          </li>
          <button
            onClick={() =>
              setLoginLogoutString(
                loginLogoutString === "Login" ? "Logout" : "Login"
              )
            }
            className="login-button"
          >
            {loginLogoutString}
          </button>
        </ul>
      </div>
    </div>
  );
};
