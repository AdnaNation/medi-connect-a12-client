import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaDollarSign } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: purchases = [] } = useQuery({
    queryKey: ["purchases"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-total-statistics");
      return res.data;
    },
  });
  return (
    <div>
      <Helmet>
        <title>MediConnect || Admin Home</title>
      </Helmet>
      <h2 className="text-2xl font-bold font-platypi">
        Welcome <span className="text-red-400">{user.displayName}</span>
      </h2>

      <SectionTitle heading="Statistics"></SectionTitle>
      <div className="flex flex-col md:flex-row max-w-3xl gap-3 justify-center mx-auto">
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value flex justify-center">
              <FaDollarSign /> {purchases.totalAmount}
            </div>
          </div>
        </div>
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-title">Paid Amount</div>
            <div className="stat-value flex justify-center">
              <FaDollarSign /> {purchases.paidAmount}
            </div>
          </div>
        </div>
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-title">Pending Amount</div>
            <div className="stat-value flex justify-center">
              <FaDollarSign /> {purchases.pendingAmount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
