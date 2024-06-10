import { TbFidgetSpinner } from "react-icons/tb";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSeller from "../hooks/useSeller";

const SellerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isSeller, isSellerLoading] = useSeller();
  const location = useLocation();
  if (loading || isSellerLoading) {
    return (
      <div>
        <TbFidgetSpinner className="text-4xl mx-auto text-center animate-spin" />
      </div>
    );
  }

  if (user && isSeller) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default SellerRoute;
