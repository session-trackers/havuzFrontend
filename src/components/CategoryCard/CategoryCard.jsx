import { Link } from "react-router-dom";
import "./CategoryCard.scss";

const CategoryCard = ({ img, categoryName, categorylinkname }) => {
  return (
    <Link to={`/kategoriler/${categorylinkname}`} className="categorycard">
      <div className="categoryContent">
        <h3>{categoryName}</h3>
        <div className="backgroundImg">
          <img src={img} alt="kategori" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
