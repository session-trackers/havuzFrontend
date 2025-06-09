import "./NameAndMarka.scss";

const NameAndMarka = ({ marka, name, desc }) => {
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui optio iure
        ad totam. Fugit hic eaque ut mollitia dolorem corrupti nesciunt
        architecto facere doloribus, dolorum placeat id unde culpa veritatis
        incidunt expedita provident? Quo pariatur provident in quaerat, mollitia
        eligendi!
      </p>

      <div className="buttons">
        <div className="sepeteEkle">
          <button className="btnSepet">Kayıt Oluştur</button>
        </div>
      </div>
    </div>
  );
};

export default NameAndMarka;
