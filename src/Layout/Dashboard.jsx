import { FaHome } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import DashboardNav from "../Shared/DashboardNav";
import BlankSpace from "../components/BlankSpace";
import useAdmin from "../hooks/useAdmin";
import useSeller from "../hooks/useSeller";

const Dashboard = () => {
  const [isSeller] = useSeller();
  const [isAdmin] = useAdmin();

  return (
    <div>
      <DashboardNav></DashboardNav>
      <BlankSpace></BlankSpace>
      <div className="flex">
        <div className="min-h-screen p-3 space-y-2 w-60 bg-red-500">
          <div className="divide-y dark:divide-gray-300">
            <ul className="pt-2 pb-4 space-y-5 text-lg">
              {isSeller ? (
                <>
                  <li className="dark:bg-gray-100 dark:text-gray-900">
                    <Link className="btn btn-ghost" to="/dashboard/sellerHome">
                      Seller Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/manage-medicines"
                    >
                      Manage Medicines
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/purchaseHistory"
                    >
                      Payment History
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/sellerAdvertise"
                    >
                      Ask For Advertisement
                    </Link>
                  </li>
                </>
              ) : isAdmin ? (
                <>
                  <li>
                    <Link className="btn btn-ghost" to="/dashboard/adminHome">
                      Admin Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/manage-users"
                    >
                      Manage Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/manage-category"
                    >
                      Manage Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/manage-payment"
                    >
                      Payment Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/sales-report"
                    >
                      Sales Report
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/banner-advertise"
                    >
                      Banner Advertise
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link className="btn btn-ghost" to="/dashboard/userHome">
                      User Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost"
                      to="/dashboard/paymentHistory"
                    >
                      Payment History
                    </Link>
                  </li>
                  <li>
                    <Link className="btn btn-ghost" to="/dashboard/invoice">
                      Invoice
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="pt-4 pb-2 space-y-1 text-lg">
              <li>
                <Link className="flex gap-1 items-center btn-ghost" to="/">
                  <FaHome></FaHome> Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-grow">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
