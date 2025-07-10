import "./NameAndMarka.scss";

const NameAndMarka = ({ marka, name, desc, longDescription }) => {
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>
      <p>{desc}</p>
      <p className="descriptionMark">{longDescription}</p>
    </div>
  );
};

export default NameAndMarka;
