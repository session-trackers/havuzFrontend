import { Link } from "react-router-dom";
import "./TeamListCard.scss";

function TeamlisCard({ product }) {
  return (
    <li className="glide__slide">
      <a href={"#"} target="_blank" rel="noopener noreferrer" className="card">
        <div className="sliderImg">
          <img src={product.coverImage.url} alt="" />
        </div>

        <div className="cardSection">
          <div className="CardTop">
            <h4 className="title">{product.name}</h4>
            <p className="desc">{product.description}</p>
          </div>
        </div>
      </a>
    </li>
  );
}

export default TeamlisCard;
