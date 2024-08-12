import React from "react";
import ReactDOM from "react-dom/client";
import { HeaderComponent } from "./Components/Header";
import { BodyComponent } from "./Components/Body";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Contact } from "./Components/Contact";
import { ErrorComponent } from "./Components/ErrorComponent";
import { About } from "./Components/About";
import RestaurantMenu from "./Components/RestaurantMenu";
import useActivityStatus from "./utils/useActivityStatus";

const AppLayout = () => {
  const activityStatus = useActivityStatus();

  return !activityStatus ? (
    <h1>Your internet is a bit wonky, please check network connection.</h1>
  ) : (
    <div className="app">
      <HeaderComponent />
      <Outlet />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <BodyComponent />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "restaurants/:id",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <ErrorComponent />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
