import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { HeaderComponent } from "./Components/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorComponent } from "./Components/ErrorComponent";
import RestaurantMenu from "./Components/RestaurantMenu";
import useActivityStatus from "./utils/useActivityStatus";
import { BodyComponent } from "./Components/Body";
import About from "./Components/About";
import { CartProvider } from "./utils/CartContext";
import Cart from "./Components/Cart";
import OrderPlaced from "./Components/OrderPlaced";

const AppLayout = () => {
  const activityStatus = useActivityStatus();

  return !activityStatus ? (
    // <h1>Your internet is a bit wonky, please check network connection.</h1>
    <ErrorComponent noInternet={true} />
  ) : (
    <div className="app h-full">
      <HeaderComponent />
      <Outlet />
    </div>
  );
};

const Feature = lazy(() => import("./Components/Feature"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <AppLayout />
      </CartProvider>
    ),
    children: [
      {
        path: "/",
        element: <BodyComponent />,
      },
      {
        path: "/feature",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Feature />
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
      {
        path: '/cart',
        element: <Cart />
      }, 
      {
        path: '/success',
        element: <OrderPlaced />
      }
    ],
    errorElement: <ErrorComponent noInternet={false}/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
