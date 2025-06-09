import PersonIcon from "@mui/icons-material/Person";
import "./StudentCard.scss";

const StudentCard = ({ student, isSelected, onClick }) => {
  return (
    <div
      className={`paket-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="imgContainerPaket">
        <img src={student?.coverImage?.url} alt="" />
      </div>

      <div className="info-wrapper">
        <h4 className="name">
          {student.name} {student.lastName}
        </h4>
        <p className="id">ID: {student.id}</p>
      </div>

      <div className="background"></div>
    </div>
  );
};

export default StudentCard;
