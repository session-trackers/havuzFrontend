import "./ListCard.scss";
import imgg from "/images/1.jpeg";

const ListCard = ({ proje }) => {
  return (
    <a
      href={proje.images[0]}
      target="_blank"
      rel="noopener noreferrer"
      className="projeCard"
    >
      <div className="img">
        <img src={imgg} alt="" />
      </div>
      <div className="detayCard">
        <div className="desc">
          <div className="title">
            <h3>{proje.title}</h3>
          </div>
          <div className="text">
            <p>{proje.titleContent}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ListCard;
