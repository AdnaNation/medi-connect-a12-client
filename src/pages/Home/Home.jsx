import DiscountProducts from "../DiscountProducts";
import CategorySection from "./CategorySection";
import Slider from "./Slider";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Slider></Slider>
      <CategorySection></CategorySection>
      <DiscountProducts></DiscountProducts>
    </div>
  );
};

export default Home;
