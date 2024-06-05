import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../components/SectionTitle";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const CategorySection = () => {
  return (
    <section>
      <SectionTitle heading={"Categories"}></SectionTitle>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-24"
      >
        <SwiperSlide>
          <h2 className="border p-8 text-center">
            Pain Relief & Fever Reducers
          </h2>
        </SwiperSlide>
        <SwiperSlide>
          <h2 className="border p-8 text-center">Allergy & Cold Relief</h2>
        </SwiperSlide>
        <SwiperSlide>
          <h2 className="border p-8 text-center">Digestive Health</h2>
        </SwiperSlide>
        <SwiperSlide>
          <h2 className="border p-8 text-center">Sleep Aids</h2>
        </SwiperSlide>
        <SwiperSlide>
          <h2 className="border p-8 text-center">Vitamins & Supplements</h2>
        </SwiperSlide>
        <SwiperSlide>
          <h2 className="border p-8 text-center">Skin Care & Beauty</h2>
        </SwiperSlide>
      </Swiper>

      <div className="flex justify-between">
        <h2>Pain Relief & Fever Reducers</h2>
        <h2>Allergy & Cold Relief</h2>
        <h2>Digestive Health</h2>
        <h2>Sleep Aids</h2>
        <h2>Vitamins & Supplements</h2>
        <h2>Skin Care & Beauty</h2>
      </div>
    </section>
  );
};

export default CategorySection;
