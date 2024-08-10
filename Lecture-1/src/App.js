import React from "react";
import ReactDOM from "react-dom/client";
import { HeaderComponent } from "./Components/Header";
import { BodyComponent } from "./Components/Body";


const AppLayout = () => {
  return (
    <div className="app">

      <HeaderComponent />
      <BodyComponent />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
