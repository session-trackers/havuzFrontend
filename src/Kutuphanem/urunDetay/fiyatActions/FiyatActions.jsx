import "./FiyatActions.scss";

const FiyatActions = ({ id, fiyat, indirimliFiyat }) => {
  return (
    <div className="fiyatAction">
      <div className="price">
        <span className="fiyat">{fiyat} TL</span>
        <span className="indirimliFiyat">{indirimliFiyat} TL</span>
      </div>
    </div>
  );
};

export default FiyatActions;
