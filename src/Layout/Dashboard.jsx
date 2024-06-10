import { FaHome } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import DashboardNav from "../Shared/DashboardNav";
import BlankSpace from "../components/BlankSpace";
import useAuth from "../hooks/useAuth";
import useSeller from "../hooks/useSeller";

const Dashboard = () => {
  const { logOut } = useAuth();
  const [isSeller] = useSeller();

  const handleLogOut = () => {
    logOut();
  };
  return (
    <div>
      <DashboardNav></DashboardNav>
      <BlankSpace></BlankSpace>
      <div className="flex">
        <div className="min-h-screen p-3 space-y-2 w-60 bg-red-500 ">
          <div className="divide-y dark:divide-gray-300">
            {isSeller && (
              <ul className="pt-2 pb-4 space-y-5 text-lg">
                <li className="dark:bg-gray-100 dark:text-gray-900">
                  <NavLink to="/dashboard">Seller Home</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-medicines">
                    Manage Medicines
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payment">Payment History</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/sellerAdvertise">
                    Ask For Advertisement
                  </NavLink>
                </li>
              </ul>
            )}
            <ul className="pt-4 pb-2 space-y-1 text-lg">
              <li>
                <Link className="flex gap-1 items-center" to="/">
                  <FaHome></FaHome> Home
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
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
