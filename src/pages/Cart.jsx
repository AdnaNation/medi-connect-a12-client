import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BlankSpace from "../components/BlankSpace";
import SectionTitle from "../components/SectionTitle";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const Cart = () => {
  const { user } = useAuth();
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
    axiosSecure.patch(`/myCart/${id}`);
    refetch();
  };

  const handleDeleteOne = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Selected medicine has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
    // axiosSecure.delete(`carts/${id}`);
    // refetch();
  };
  const handleDeleteAll = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${email}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Selected medicines have been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen">
      <BlankSpace></BlankSpace>
      <SectionTitle heading="My Cart"></SectionTitle>

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
                  <FiMinus onClick={() => handleMinus(medicine._id)} />
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
                  <button
                    onClick={() => handleDeleteOne(medicine._id)}
                    className="px-3 text-xl"
                  >
                    <RxCrossCircled />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="flex justify-end">Total Price =</td>
              <td>{totalPrice.toFixed(2)}</td>
              <td>
                {" "}
                <button
                  onClick={() => handleDeleteAll(user.email)}
                  className="bg-red-500 px-2 text-white rounded-md"
                >
                  Delete All
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-evenly mb-8">
        {cart.length ? (
          <Link to="/checkOut">
            <button className="btn btn-primary">Checkout</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
