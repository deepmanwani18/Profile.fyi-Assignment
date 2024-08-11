import React from "react";
import ReactDOM from "react-dom/client";
import { HeaderComponent } from "./Components/Header";
import { BodyComponent } from "./Components/Body";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Contact } from "./Components/Contact";
import { ErrorComponent } from "./Components/ErrorComponent";
import { About } from "./Components/About";

const AppLayout = () => {
  return (
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
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/',
        element: <BodyComponent />
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />
      }
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
