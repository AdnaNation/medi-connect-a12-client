import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const handlePayment = (id) => {
    const payment = {
      _id: id,
      status: "paid",
    };

    axiosSecure.patch("/payment", payment).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: "Status has been changed",
          showConfirmButton: false,
          timer: 800,
        });
      }
      console.log(res);
    });
  };
  return (
    <div>
      <SectionTitle heading="Users Payments"></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-center">
          {/* head */}
          <thead>
            <tr className="bg-orange-300">
              <th>Transaction ID</th>
              <th>User Email</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments
              .slice()
              .reverse()
              .map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.transactionId}</td>
                  <td>{payment.email}</td>
                  <td>
                    {payment.date}, {payment.time}
                  </td>
                  <td>${payment.price}</td>
                  <td>
                    {payment.status === "paid" ? (
                      "paid"
                    ) : (
                      <button
                        onClick={() => handlePayment(payment._id)}
                        className="btn-ghost bg-red-400 px-1 rounded"
                      >
                        accept payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
