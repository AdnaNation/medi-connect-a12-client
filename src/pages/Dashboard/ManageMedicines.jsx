import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMedicines from "../../hooks/useMedicines";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageMedicines = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [medicines, isMedicineLoading, refetch] = useMedicines();

  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const medicine = {
        medicineName: data.medicineName,
        genericName: data.genericName,
        image: res.data.data.display_url,
        category: data.category,
        company: data.company,
        massUnit: data.massUnit,
        unitPrice: parseFloat(data.unitPrice),
        discount: parseFloat(data.discount),
        description: data.description,
        sellerEmail: user.email,
      };

      const medicineRes = await axiosSecure.post("/medicine", medicine);
      if (medicineRes.data.insertedId) {
        // show success popup
        reset();
        refetch();
        setLoading(false);
        navigate("/dashboard/manage-medicines");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the page.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div className="text-center">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn px-8 py-3 font-semibold rounded border border-green-600"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Add Medicine
      </button>
      <dialog id="my_modal_2" className="modal mt-8">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Medicine Name*</span>
              </label>
              <input
                type="text"
                placeholder="Medicine Name"
                {...register("medicineName", { required: true })}
                required
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Generic Name*</span>
              </label>
              <input
                type="text"
                placeholder="Item Generic Name"
                {...register("genericName", { required: true })}
                required
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="flex gap-6 flex-col md:flex-row">
              {/* category */}
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Category*</span>
                </label>
                <select
                  defaultValue="default"
                  {...register("category", { required: true })}
                  className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="Tablet">Tablet</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Injection">Injection</option>
                  <option value="Inhaler">Inhaler</option>
                  <option value="Ointment">Ointment</option>
                </select>
              </div>

              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Company*</span>
                </label>
                <select
                  defaultValue="default"
                  {...register("company", { required: true })}
                  className="select select-bordered w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                >
                  <option disabled value="default">
                    Select a company
                  </option>
                  <option value="Beximco Pharmaceuticals Ltd">Beximco</option>
                  <option value="Square Pharmaceuticals Ltd">Square</option>
                  <option value="Renata Limited">Renata</option>
                  <option value="ACI Limited">ACI</option>
                  <option value="Incepta Pharmaceuticals Ltd">Incepta</option>
                  <option value="Eskayef Pharmaceuticals Ltd">Eskayef</option>
                  <option value="Aristopharma Ltd">Aristopharma</option>
                  <option value="Orion Pharma Ltd">Orion</option>
                  <option value="Opsonin Pharma Limited">Opsonin</option>
                  <option value="Drug International Ltd">Drug Int.</option>
                  <option value="Acme Laboratories Ltd">Acme</option>
                  <option value="Novo Nordisk">Novo Nordisk</option>
                  <option value="GlaxoSmithKline">GlaxoSmithKline</option>
                </select>
              </div>
            </div>

            <div className="flex gap-6 flex-col md:flex-row">
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Mass Unit (Mg or Ml)*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mass Unit"
                  {...register("massUnit", { required: true })}
                  required
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Per Unit Price*</span>
                </label>
                <input
                  type="text"
                  placeholder="Per Unit Price"
                  {...register("unitPrice", { required: true })}
                  required
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
            </div>
            {/* Short Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Short Description</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered h-24 w-full px-3 py-2  rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                placeholder="Short Description"
              ></textarea>
            </div>

            <div className="flex gap-6 flex-col md:flex-row">
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Upload Photo*</span>
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full my-6">
                <label className="label">
                  <span className="label-text">Discount*</span>
                </label>
                <input
                  type="text"
                  defaultValue="0"
                  placeholder="Discount"
                  {...register("discount", { required: true })}
                  required
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
            </div>

            <button className="btn">
              {loading ? "Adding" : "Add Medicine"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <SectionTitle heading="My Medicine List"></SectionTitle>
      {!isMedicineLoading && (
        <div>
          <TbFidgetSpinner className="text-4xl mx-auto text-center animate-spin" />
        </div>
      )}
      <p className=" text-left font-bold underline ml-1">
        My Medicines: ({medicines.length})
      </p>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Generic Name</th>
              <th>Company</th>
              <th>Mass Unit</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={medicine._id}>
                <th>{index + 1}</th>
                <td>{medicine.medicineName}</td>
                <td>{medicine.genericName}</td>
                <td>{medicine?.company?.split(" ")[0]}</td>
                <td>{medicine.massUnit}</td>
                <td>${medicine.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
