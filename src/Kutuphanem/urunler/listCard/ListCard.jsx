import "./ListCard.scss";

const ListCard = ({ proje }) => {
  console.log(proje);
  return (
    <div
      // href={proje.images[0]}
      target="_blank"
      rel="noopener noreferrer"
      className="projeCard"
    >
      <div className="img">
        <img src={proje.coverImage} alt="" />
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
    </div>
  );
};

export default ListCard;
