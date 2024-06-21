import { TbFidgetSpinner } from "react-icons/tb";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <div>
        <TbFidgetSpinner className="text-4xl mx-auto text-center animate-spin" />
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default AdminRoute;
