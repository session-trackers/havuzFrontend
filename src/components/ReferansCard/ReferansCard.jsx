import "./ReferansCard.scss";

const ReferansCard = ({ img, title, unvan }) => {
  return (
    <div className="referansCard">
      <div className="img">
        <img src={img} alt="" />
      </div>
      <div className="detayCard">
        <div className="desc">
          <div className="title">
            <h4>{title}</h4>
            <h5>{unvan}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferansCard;
