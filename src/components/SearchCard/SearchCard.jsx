import React from "react";
import "./SearchCard.scss";

const SearchCard = ({ product }) => {
  return (
    <div className="searchCard">
      <div className="sliderImg">
        <img src={product.coverImage} alt="img" />
      </div>

      <div className="cardSection">
        <div className="CardTop">
          <h4 className="title">{product.title}</h4>
          <p className="desc">{product.titleContent}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
