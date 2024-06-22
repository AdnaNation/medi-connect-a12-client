import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../components/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const DiscountMedicine = () => {
  const axiosPublic = useAxiosPublic();
  const { data: medicines = [] } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicines");
      return res.data;
    },
  });
  const discountMedicines = medicines.filter(
    (medicine) => medicine.discount > 0
  );
  return (
    <div>
      <SectionTitle heading={"Discount Products"}></SectionTitle>

      <Swiper
        slidesPerView={2}
        spaceBetween={3}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper md:mx-20"
        autoplay={{
          delay: 2000,
        }}
      >
        {discountMedicines.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="max-w-xs  hover:shadow-2xl  ">
              <div className=" w-h-60 h-60  mx-auto">
                <img
                  src={product.image}
                  alt=""
                  className="object-cover object-center h-full w-full mx-auto    dark:bg-gray-500"
                />
              </div>
              <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-4 text-center">
                  <h2 className="text-xl font-semibold tracking-wide">
                    {product.name}
                  </h2>
                  <h2 className="  tracking-wide uppercase  bg-cyan-100 rounded-md">
                    {product.discount}% OFF
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountMedicine;
