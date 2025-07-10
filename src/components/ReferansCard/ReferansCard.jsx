import "./ReferansCard.scss";

const ReferansCard = ({ img, title, unvan }) => {
  return (
    <div className="referansCard">
      <div className="desen"></div>
      <div className="img">
        <img src={img} alt={title} />
      </div>
      <div className="detayCard">
        <h4>{title}</h4>
        <h5>{unvan}</h5>
      </div>
    </div>
  );
};

export default ReferansCard;
