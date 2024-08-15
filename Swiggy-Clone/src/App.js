import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { HeaderComponent } from "./Components/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorComponent } from "./Components/ErrorComponent";
import RestaurantMenu from "./Components/RestaurantMenu";
import useActivityStatus from "./utils/useActivityStatus";
import { BodyComponent } from "./Components/Body";
import About from "./Components/About";

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

const Contact = lazy(() => import("./Components/Contact"));

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
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Contact />
          </Suspense>
        ),
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
