import { useQuery } from "@tanstack/react-query";
import { FaDollarSign } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SellerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: purchases = [] } = useQuery({
    queryKey: ["purchases", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-total-stats/${user.email}`);
      return res.data;
    },
  });
  console.log(purchases);
  return (
    <div>
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

export default SellerHome;
