import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMedicines = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: medicines = [],
    refetch,
    isPending: isMedicineLoading,
  } = useQuery({
    queryKey: ["medicines", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/medicines/${user.email}`);

      return res.data;
    },
  });
  return [medicines, refetch, isMedicineLoading];
};

export default useMedicines;
