import "./NameAndMarka.scss";

const NameAndMarka = ({ marka, name, desc, addressUrl, adres }) => {
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>

      <div className="textHAvuz">
        <p>{desc}</p>

        <p>
          <span>Adres:</span> {adres}
        </p>
      </div>

      <div className="buttons">
        <div className="sepeteEkle">
          <a href={addressUrl} target="_blank" className="btnSepet">
            Yol Tarifi Al
          </a>
        </div>
      </div>
    </div>
  );
};

export default NameAndMarka;
