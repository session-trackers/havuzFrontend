import "./ReferansCard.scss";

const ReferansCard = ({ img, title }) => {
  return (
    <div className="referansCard">
      <div className="img">
        <img src={img} alt="" />
      </div>
      <div className="detayCard">
        <div className="desc">
          <div className="title">
            <h3>{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferansCard;
