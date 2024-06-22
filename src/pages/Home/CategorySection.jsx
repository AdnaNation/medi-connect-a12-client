import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import useCategory from "../../hooks/useCategory";

const CategorySection = () => {
  const [categories] = useCategory();
  return (
    <section>
      <SectionTitle heading={"Categories"}></SectionTitle>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3  gap-3 lg:mx-20">
        {categories.map((category) => (
          <Link
            to={`/categoryDetails/${category.categoryName}`}
            key={category._id}
          >
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={category.image}
                  className="h-48 bg-slate-600 mt-2"
                  alt=""
                />
              </figure>
              <div className="card-body">
                <h3 className="text-2xl text-center">
                  {category.categoryName}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
