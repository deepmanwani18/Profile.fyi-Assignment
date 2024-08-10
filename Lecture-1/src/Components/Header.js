import { useState } from "react";

export const HeaderComponent = () => {
  const [loginLogoutString, setLoginLogoutString] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={require("../../Public/app-logo.jpeg")} />
      </div>
      <div className="nav-bar">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
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
