import BlankSpace from "../../components/BlankSpace";
import DiscountProducts from "../DiscountProducts";
import CategorySection from "./CategorySection";
import Slider from "./Slider";

const Home = () => {
  return (
    <div className="min-h-screen">
      <BlankSpace></BlankSpace>
      <Slider></Slider>
      <CategorySection></CategorySection>
      <DiscountProducts></DiscountProducts>
    </div>
  );
};

export default Home;
