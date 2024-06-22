import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { CSVLink } from "react-csv";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SalesReport = () => {
  const pdfRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  const totalPrice = payments?.reduce(
    (total, sales) => total + sales?.price,
    0
  );

  const headers = [
    { label: "Name", key: "name" },
    { label: "Seller Email", key: "sellerEmail" },
    { label: "Buyer Email", key: "buyerEmail" },
    { label: "Price", key: "price" },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
  ];

  const csvData = payments.map((payment) => ({
    name: payment.cart
      .map((item) => `${item.medicineName} - ${item.quantity}pcs`)
      .join(", "),
    sellerEmail: payment?.cart?.map((item) => item.sellerEmail).join(", "),
    buyerEmail: payment.email,
    price: payment.price,
    date: payment.date,
    time: payment.time,
  }));
  return (
    <div>
      <div ref={pdfRef}>
        <SectionTitle heading="Sales Report"></SectionTitle>
        <div className="overflow-x-auto">
          <table className="table table-zebra max-w-5xl mx-auto text-center">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Seller Email</th>
                <th>Buyer Email</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td className="space-y-4">
                    {payment?.cart?.map((item) => (
                      <p key={item._id}>
                        {item.medicineName}- {item.quantity}pcs
                      </p>
                    ))}
                  </td>
                  <td className="space-y-4">
                    {" "}
                    {payment?.cart?.map((item) => (
                      <p key={item._id}>{item.sellerEmail}</p>
                    ))}
                  </td>
                  <td>{payment.email}</td>
                  <td>${payment.price}</td>
                  <td>
                    {payment.date}, {payment.time}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-end">Total Sales =</td>
                <td className="text-xl">${totalPrice}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="text-center">
        <CSVLink
          data={csvData}
          headers={headers}
          filename={"sales-report.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Download as CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default SalesReport;
