import Marquee from "react-fast-marquee";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMedicines from "../../hooks/useMedicines";

const SellerAdvertise = () => {
  const [medicines, isMedicineLoading] = useMedicines();
  const axiosSecure = useAxiosSecure();

  const discounted = medicines.filter((medicine) => medicine.discount > 0);
  //   console.log(discounted);

  const handleAsk = async (medicine) => {
    const medicineRes = await axiosSecure.post("/advertise", medicine);
    if (medicineRes.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${medicine.medicineName} is added.`,
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${medicine.medicineName} is already added to the data.`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  return (
    <div>
      <SectionTitle heading="Ask For Advertise"></SectionTitle>

      <Marquee>
        Only discounted product will be shown here and eligible for
        Advertisement.
      </Marquee>
      {!isMedicineLoading && (
        <div>
          <TbFidgetSpinner className="text-4xl mx-auto text-center animate-spin" />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Company</th>
              <th>Unit Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounted.map((medicine, index) => (
              <tr key={medicine._id}>
                <th>{index + 1}</th>
                <td>
                  <img src={medicine.image} className="w-16 h-16" alt="" />
                </td>
                <td>{medicine.medicineName}</td>
                <td>{medicine?.company?.split(" ")[0]}</td>
                <td>${medicine.unitPrice}</td>
                <td>
                  <button
                    onClick={() => handleAsk(medicine)}
                    className=" bg-blue-600 text-white px-2 rounded-md btn-secondary"
                  >
                    Ask For Ad.
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerAdvertise;
