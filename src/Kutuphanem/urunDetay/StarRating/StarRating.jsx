import "./StarRating.scss";
import StarRateIcon from "@mui/icons-material/StarRate";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <StarRateIcon
          key={index}
          className={index < rating ? "star filled" : "star empty"}
        />
      ))}
    </div>
  );
};

export default StarRating;
