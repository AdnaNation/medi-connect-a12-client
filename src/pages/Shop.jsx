import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { TiEyeOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import BlankSpace from "../components/BlankSpace";
import SectionTitle from "../components/SectionTitle";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const Shop = () => {
  const { user } = useAuth();
  const [selectedId, SetSelectedId] = useState("6665bafce5c527039325622a");
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();
  const { data: medicines = [] } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/medicines");
      return res.data;
    },
  });
  const { data: medicine = [] } = useQuery({
    queryKey: ["medicine", selectedId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/medicine/${selectedId}`);
      return res.data;
    },
  });
  // console.log(medicine);

  const handleDetail = (id) => {
    SetSelectedId(id);
    refetch();
  };
  const handleAddToCart = (medicine) => {
    const cartItem = {
      image: medicine.image,
      medicineId: medicine._id,
      email: user.email,
      medicineName: medicine.medicineName,
      unitPrice: medicine.unitPrice,
      discount: medicine.discount,
      company: medicine.company,
      quantity: 1,
    };
    // console.log(cartItem);
    axiosSecure.post("/carts", cartItem).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${medicine.medicineName} added to your cart`,
          showConfirmButton: false,
          timer: 1500,
        });
        // refetch cart to update the cart items count
        refetch();
      }
    });
  };
  return (
    <div className="min-h-screen">
      <BlankSpace></BlankSpace>
      <SectionTitle heading="Medicines List"></SectionTitle>
      <p className=" text-left font-bold underline ml-1">
        Available Medicines: ({medicines.length})
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Company</th>
              <th>See Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={medicine._id}>
                <th>{index + 1}</th>
                <td>{medicine.medicineName}</td>
                <td>{medicine.company.split(" ")[0]}</td>
                <td>
                  <button onClick={() => handleDetail(medicine._id)}>
                    <TiEyeOutline
                      onClick={() =>
                        document.getElementById("my_modal_5").showModal()
                      }
                      className="ml-7 text-2xl"
                    />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="px-1 bg-gray-300 rounded-lg"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dialog id="my_modal_5" className="modal">
          <div className="modal-box  w-11/12 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="bg-gray-100">
                <img
                  className="w-40 md:w-80 h-36 md:h-72 mx-auto md:mx-0"
                  src={medicine.image}
                  alt=""
                />
              </div>
              <div className="space-y-2">
                <p className="text-2xl md:text-3xl font-bold">
                  {medicine.medicineName}
                </p>
                <p>Generic Name: {medicine.genericName}</p>
                <p>Category: {medicine.category}</p>
                <p>Company: {medicine.company}</p>
                <p className="font-bold">{medicine.description}</p>
                <p>Mass Unit: {medicine.massUnit}</p>
                <p className="flex items-center">
                  Unit Price: {medicine.unitPrice} <TbCurrencyTaka />
                </p>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Shop;
