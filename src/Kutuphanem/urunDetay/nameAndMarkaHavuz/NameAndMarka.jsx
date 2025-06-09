import "./NameAndMarka.scss";

const NameAndMarka = ({ marka, name, desc, addressUrl, address }) => {
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>

      <div className="textHAvuz">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui optio
          iure ad totam. Fugit hic eaque ut mollitia dolorem corrupti nesciunt
          architecto facere doloribus
        </p>

        <p>
          <span>Adres:</span> {address}
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
