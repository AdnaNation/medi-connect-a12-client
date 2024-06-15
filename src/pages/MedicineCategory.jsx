import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlankSpace from "../components/BlankSpace";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MedicineCategory = () => {
  const [category, setCategory] = useState("Tablet");
  const axiosSecure = useAxiosSecure();
  const categories = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection",
    "Ointment",
    "Inhaler",
  ];
  const { refetch, data: medicines = [] } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/medicineCategory/${category}`);
      return res.data;
    },
  });
  const handleCategory = (category) => {
    setCategory(category);
    refetch();
    console.log(category);
  };

  return (
    <div className="min-h-screen text-center">
      <BlankSpace></BlankSpace>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        {categories.map((category) => (
          <SwiperSlide
            onClick={() => handleCategory(category)}
            className="border card bg-orange-600 bg-opacity-35"
            key={category.idx}
          >
            {" "}
            <div className=" py-4 w-full text-center uppercase">
              {category}
            </div>{" "}
          </SwiperSlide>
        ))}
      </Swiper>

      {medicines.map((medicine) => (
        <p key={medicine._id}>{medicine.medicineName}</p>
      ))}
    </div>
  );
};

export default MedicineCategory;
