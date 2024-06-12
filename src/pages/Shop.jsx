import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TiEyeOutline } from "react-icons/ti";
import BlankSpace from "../components/BlankSpace";
import SectionTitle from "../components/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Shop = () => {
  const [selectedId, SetSelectedId] = useState("6665bafce5c527039325622a");
  const axiosSecure = useAxiosSecure();
  const { data: medicines = [], refetch } = useQuery({
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
  console.log(medicine);

  const handleDetail = (id) => {
    SetSelectedId(id);
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
                  <button className="px-1 bg-gray-300 rounded-lg">
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
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
