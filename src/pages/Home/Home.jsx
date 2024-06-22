import { Helmet } from "react-helmet-async";
import BlankSpace from "../../components/BlankSpace";
import Accordian from "./Accordian";
import CategorySection from "./CategorySection";
import DiscountMedicine from "./DiscountMedicine";
import Slider from "./Slider";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>MediConnect || Home</title>
      </Helmet>
      <BlankSpace></BlankSpace>
      <Slider></Slider>
      <CategorySection></CategorySection>
      <DiscountMedicine></DiscountMedicine>
      <Accordian></Accordian>
    </div>
  );
};

export default Home;
