import { Link } from "react-router-dom";
import "./ListCardDelete.scss";
import EditIcon from "@mui/icons-material/Edit";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

const ListCardDelete = ({ selectedPaketId, item, handleEditSeans }) => {
  return (
    <div
      onClick={() => {
        handleEditSeans(item.id);
      }}
      className={
        selectedPaketId == item.id
          ? "projeCardDelete selected"
          : "projeCardDelete"
      }
    >
      <div className="img">
        <img src={item.coverImage?.url} alt="" />
      </div>

      <div className="detayCard">
        <div className="desc">
          <div className="title">
            <h3>{item.name}</h3>
          </div>
          <div className="text">
            <p>{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCardDelete;
