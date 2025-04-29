import { Link } from "react-router-dom";
import "./CategoryCard.scss";
import FadeInSection from "../FadeInSection/FadeInSection";

const CategoryCard = ({ img, categoryName, linkName }) => {
  return (
    <Link to={`/kategoriler/${linkName}`} className="categorycard">
      <FadeInSection>
        <div className="categoryContent">
          <h3>{categoryName}</h3>
          <div className="backgroundImg">
            <img src={img} alt={categoryName} />
          </div>
        </div>
      </FadeInSection>
    </Link>
  );
};

export default CategoryCard;
