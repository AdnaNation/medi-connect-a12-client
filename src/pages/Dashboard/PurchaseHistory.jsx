import { useQuery } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PurchaseHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: purchases = [], isPending } = useQuery({
    queryKey: ["seller-stats", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-stats/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle heading="My Products purchase List"></SectionTitle>
      {isPending && (
        <div>
          <TbFidgetSpinner className="text-4xl mx-auto text-center animate-spin" />
        </div>
      )}

      <p>Total Orders: {purchases.length}</p>
      <div className="overflow-x-auto">
        {purchases.map((purchase) => (
          <table key={purchase._id} className="table table-zebra mb-10">
            {/* head */}
            <thead className="bg-orange-300 text-gray-800">
              <tr>
                <th>Txn ID: {purchase?.transactionId}</th>
                <th>
                  {purchase.date}, {purchase.time}
                </th>
                <th>User: {purchase.email}</th>
                <th>Status: {purchase.status}</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {purchase?.cart?.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.medicineName}</td>
                  <td>Quantity: {item.quantity}</td>
                  <td>
                    $
                    {item.unitPrice * item.quantity -
                      (item.discount / 100) * item.unitPrice * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td className="text-end ">Total= </td>
                <td className="bg-orange-200 text-gray-800">
                  $
                  {purchase?.cart?.reduce(
                    (total, medicine) =>
                      total +
                      medicine.unitPrice * medicine.quantity -
                      (medicine.discount / 100) *
                        medicine.unitPrice *
                        medicine.quantity,
                    0
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
