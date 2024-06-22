import { useQuery } from "@tanstack/react-query";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageBanner = () => {
  const axiosSecure = useAxiosSecure();
  const { data: advertises = [], refetch } = useQuery({
    queryKey: ["advertises"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertises");
      return res.data;
    },
  });

  const handleAddAdvertise = async (advertise) => {
    const slider = {
      image: advertise.image,
      medicineName: advertise.medicineName,
      discount: advertise.discount,
      description: advertise.description,
    };

    await axiosSecure.post("/slider", slider);
    refetch();
    Swal.fire({
      position: "top-center",
      title: "This is added to banner",
      showConfirmButton: false,
      timer: 1000,
    });
  };
  const handleRemoveAdvertise = async (advertise) => {
    await axiosSecure.delete(`/slider/${advertise.medicineName}`);
    refetch();
    Swal.fire({
      position: "top-center",
      title: "This is removed from banner",
      showConfirmButton: false,
      timer: 1000,
    });
  };
  return (
    <div>
      <SectionTitle heading="Add Banner"></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-center">
          {/* head */}
          <thead>
            <tr className="bg-orange-300">
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Seller Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {advertises
              .slice()
              .reverse()
              .map((advertise) => (
                <tr key={advertise._id}>
                  <td>
                    <img
                      className="w-20 md:w-40 h-20 mx-auto"
                      src={advertise.image}
                      alt=""
                    />
                  </td>
                  <td>{advertise.medicineName}</td>
                  <td className="w-80">{advertise.description}</td>
                  <td>{advertise.sellerEmail}</td>
                  <td>
                    {advertise.isAdvertised === false ? (
                      <button
                        onClick={() => handleAddAdvertise(advertise)}
                        className="-ml-8"
                      >
                        <IoMdAddCircle className="text-2xl" />
                      </button>
                    ) : (
                      <button onClick={() => handleRemoveAdvertise(advertise)}>
                        <IoIosRemoveCircle className="text-2xl" />
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

export default ManageBanner;
