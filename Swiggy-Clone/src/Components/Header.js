import { useState } from "react";

import { Link } from "react-router-dom";
export const HeaderComponent = () => {
  const [loginLogoutString, setLoginLogoutString] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={require("../../Public/app-logo.jpeg")} />
      </div>
      <div className="nav-bar">
        <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
          <Link to="/contact">Contact Us</Link>
            
            </li>
          <li>Cart</li>
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
