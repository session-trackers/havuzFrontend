import StarRating from "../StarRating/StarRating";
import "./RatingAndCode.scss";

const RatingAndCode = ({ rating, comments, code }) => {
  return (
    <div className="ratingAndCode">
      <div className="ratingAndComments">
        <StarRating rating={rating} />
        <span className="commentSayi">{comments} Yorum</span>
      </div>

      <div className="divider"></div>

      <div className="code">
        <span className="title">Ürün Kodu: </span>
        <span>{code}</span>
      </div>
    </div>
  );
};

export default RatingAndCode;
