import { FaHome } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import DashboardNav from "../Shared/DashboardNav";
import BlankSpace from "../components/BlankSpace";
import useSeller from "../hooks/useSeller";

const Dashboard = () => {
  const [isSeller] = useSeller();
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
                  <NavLink to="/dashboard/sellerHome">Seller Home</NavLink>
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
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current dark:text-gray-600"
                  >
                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                    <rect width="32" height="64" x="256" y="232"></rect>
                  </svg>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
