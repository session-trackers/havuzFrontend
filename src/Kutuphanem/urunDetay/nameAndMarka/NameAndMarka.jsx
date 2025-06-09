import "./NameAndMarka.scss";

const NameAndMarka = ({ marka, name, desc }) => {
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default NameAndMarka;
