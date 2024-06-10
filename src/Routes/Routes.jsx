import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import ManageMedicines from "../pages/Dashboard/ManageMedicines";
import SellerHome from "../pages/Dashboard/SellerHome";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn";
import Shop from "../pages/Shop";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/shop",
        element: (
          <PrivateRoute>
            <Shop></Shop>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <SellerRoute>
            <SellerHome></SellerHome>
          </SellerRoute>
        ),
      },
      {
        path: "manage-medicines",
        element: (
          <SellerRoute>
            <ManageMedicines></ManageMedicines>
          </SellerRoute>
        ),
      },
    ],
  },
]);

export default router;
