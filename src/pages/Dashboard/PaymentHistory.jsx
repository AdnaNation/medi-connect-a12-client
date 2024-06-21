import SectionTitle from "../../components/SectionTitle";
import usePayment from "../../hooks/usePayment";

const PaymentHistory = () => {
  const [payments] = usePayment();
  return (
    <div>
      <SectionTitle heading="My Payments"></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table table-zebra max-w-6xl mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Price</th>
              <th className="text-center">Txn ID</th>
              <th className="text-center">Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>${payment.price}</td>
                <td className="text-center">{payment.transactionId}</td>
                <td className="text-center">
                  {payment.date}, {payment.time}
                </td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
