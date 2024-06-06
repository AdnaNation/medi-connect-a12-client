import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import avatarImg from "../../src/assets/non-user.jpg";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut();
  };
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/cart">
          <IoCartOutline className="pt-0 text-xl" />
        </Link>
      </li>
      <li>
        <div className="dropdown dropdown-hover dropdown-bottom">
          <div tabIndex={0} role="button" className="m-1">
            Language
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu pr-8 shadow bg-base-100 rounded-box text-black"
          >
            <li>
              <Link>English</Link>
            </li>
            <li>
              <Link>Bangla</Link>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
  return (
    <div className="navbar fixed bg-red-500 text-white z-10 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black md:text-white"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-platypi">MediConnect</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-bottom dropdown-end">
            <img
              alt=""
              tabIndex={0}
              role="button"
              className="w-10 h-10 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-gray-300 dark:ring-offset-gray-100 mr-2"
              src={user.displayURL}
            />
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 text-left"
            >
              <li>Update Profile</li>
              <li>Dashboard</li>
              <li>
                <Link onClick={handleLogOut}>Log Out</Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn bg-blue-600 border-0 text-white" to="/signUp">
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
