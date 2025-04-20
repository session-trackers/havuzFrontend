import { Link } from "react-router-dom";
import "./TeamListCard.scss";
import imgg from "/images/1.jpeg";

function TeamlisCard({ product }) {
  return (
    <li className="glide__slide">
      <a
        href={product.images[0]}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="card"
      >
        <div className="sliderImg">
          <img src={imgg} alt="" />
        </div>

        <div className="cardSection">
          <div className="CardTop">
            <h4 className="title">{product.title}</h4>
            <p className="desc">{product.titleContent}</p>
          </div>
        </div>
      </a>
    </li>
  );
}

export default TeamlisCard;
