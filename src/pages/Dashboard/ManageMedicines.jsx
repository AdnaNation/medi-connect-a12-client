import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

const ManageMedicines = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
                  <span className="label-text">Mass Unit (Mg.)*</span>
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
                  {...register("genericName", { required: true })}
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
              Add Item <FaUtensils className="ml-4"></FaUtensils>
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageMedicines;
