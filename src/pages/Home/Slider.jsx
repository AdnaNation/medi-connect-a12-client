import { useQuery } from "@tanstack/react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Slider = () => {
  const axiosPublic = useAxiosPublic();
  const { data: slider = [] } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await axiosPublic.get("/slider");
      return res.data;
    },
  });
  return (
    <>
      <section>
        <Swiper
          spaceBetween={80}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper  lg:w-[800px] h-[450px] mb-[56px]"
        >
          {slider.map((item) => (
            <SwiperSlide key={item._id}>
              <img className=" md:w-[55%] mx-auto" src={item.image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Slider;
