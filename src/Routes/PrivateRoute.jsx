import { TbFidgetSpinner } from "react-icons/tb";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // console.log(user);
  if (loading) {
    return (
      <div>
        <TbFidgetSpinner className="text-4xl mx-auto text-center animate-spin" />
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default PrivateRoute;
