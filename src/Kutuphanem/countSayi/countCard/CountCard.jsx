import "./CountCard.scss";

const CountCard = ({ count, nicelik }) => {
  return (
    <div className="cardCount">
      <span className="sayii">{count}</span>
      <p className="nicelik">{nicelik}</p>
    </div>
  );
};

export default CountCard;
