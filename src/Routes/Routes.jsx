import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Cart from "../pages/Cart";
import AdminHome from "../pages/Dashboard/AdminHome";
import Invoice from "../pages/Dashboard/Invoice";
import ManageBanner from "../pages/Dashboard/ManageBanner";
import ManageCategory from "../pages/Dashboard/ManageCategory";
import ManageMedicines from "../pages/Dashboard/ManageMedicines";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import CheckOut from "../pages/Dashboard/Payment/CheckOut";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import PaymentManagement from "../pages/Dashboard/PaymentManagement";
import PurchaseHistory from "../pages/Dashboard/PurchaseHistory";
import SalesReport from "../pages/Dashboard/SalesReport";
import SellerAdvertise from "../pages/Dashboard/SellerAdvertise";
import SellerHome from "../pages/Dashboard/SellerHome";
import UserHome from "../pages/Dashboard/UserHome";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn";
import MedicineCategory from "../pages/MedicineCategory";
import Shop from "../pages/Shop";
import SignUp from "../pages/SignUp";
import AdminRoute from "./AdminRoute";
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
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkOut",
        element: (
          <PrivateRoute>
            <CheckOut></CheckOut>
          </PrivateRoute>
        ),
      },
      {
        path: "/categoryDetails/:category",
        element: (
          <PrivateRoute>
            <MedicineCategory></MedicineCategory>
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
      // admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-payment",
        element: (
          <AdminRoute>
            <PaymentManagement></PaymentManagement>
          </AdminRoute>
        ),
      },
      {
        path: "manage-category",
        element: (
          <AdminRoute>
            <ManageCategory></ManageCategory>
          </AdminRoute>
        ),
      },
      {
        path: "banner-advertise",
        element: (
          <AdminRoute>
            <ManageBanner></ManageBanner>
          </AdminRoute>
        ),
      },
      {
        path: "sales-report",
        element: (
          <AdminRoute>
            <SalesReport></SalesReport>
          </AdminRoute>
        ),
      },
      // seller routes
      {
        path: "sellerHome",
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
      {
        path: "purchaseHistory",
        element: (
          <SellerRoute>
            <PurchaseHistory></PurchaseHistory>
          </SellerRoute>
        ),
      },
      {
        path: "sellerAdvertise",
        element: (
          <SellerRoute>
            <SellerAdvertise></SellerAdvertise>
          </SellerRoute>
        ),
      },

      // user routes
      {
        path: "userHome",
        element: (
          <PrivateRoute>
            <UserHome></UserHome>
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "invoice",
        element: (
          <PrivateRoute>
            <Invoice></Invoice>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
