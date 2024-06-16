import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import BlankSpace from "../components/BlankSpace";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce(
    (total, medicine) =>
      total +
      medicine.unitPrice * medicine.quantity -
      (medicine.discount / 100) * medicine.unitPrice * medicine.quantity,
    0
  );
  const axiosSecure = useAxiosSecure();
  // console.log(cart);
  const handlePlus = (id) => {
    axiosSecure.patch(`/carts/${id}`);
    refetch();
  };
  const handleMinus = (id) => {
    axiosSecure.patch(`/cart/${id}`);
    refetch();
  };
  return (
    <div className="min-h-screen">
      <BlankSpace></BlankSpace>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Company</th>
              <th>Price Per Unit</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((medicine, index) => (
              <tr key={medicine._id}>
                <th>{index + 1}</th>
                <td>{medicine.medicineName}</td>
                <td>{medicine.company.split(" ")[0]}</td>
                <td>{medicine.unitPrice}</td>
                <td className="flex gap-3 items-center">
                  <FiMinus onClick={() => handleMinus(medicine.medicineId)} />
                  {medicine.quantity}
                  <GoPlus onClick={() => handlePlus(medicine._id)} />
                </td>
                <td>{medicine.discount ? medicine.discount : 0}%</td>
                <td>
                  {medicine.unitPrice * medicine.quantity -
                    (medicine.discount / 100) *
                      medicine.unitPrice *
                      medicine.quantity}
                </td>
                <td>
                  <button className="px-3 text-xl">
                    <RxCrossCircled />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="flex justify-end">Total Price =</td>
            <td>{totalPrice.toFixed(2)}</td>
            <td></td>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Cart;
