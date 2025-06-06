import PersonIcon from "@mui/icons-material/Person";
import "./StudentCard.scss";

const StudentCard = ({ student, isSelected, onClick }) => {
  return (
    <div
      className={`student-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="icon-wrapper">
        <PersonIcon className="user-icon" />
      </div>
      <div className="info-wrapper">
        <h4 className="name">
          {student.name} {student.lastName}
        </h4>
        <p className="id">ID: {student.id}</p>
      </div>
    </div>
  );
};

export default StudentCard;
