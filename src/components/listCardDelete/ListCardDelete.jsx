import { Link } from "react-router-dom";
import "./ListCardDelete.scss";
import EditIcon from "@mui/icons-material/Edit";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";

const ListCardDelete = ({ item, handleEditStudent }) => {
  return (
    <div className="projeCardDelete">
      <div className="img">
        <img src={item.coverImage?.url} alt="" />
        <div className="buttonOverlay">
          <button
            onClick={() => {
              handleEditStudent(item.id);
            }}
            className="iconBox"
          >
            <SensorOccupiedIcon />
          </button>
          <Link to={`/admin/paketduzenle/${item.id}`} className="iconBox">
            <EditIcon />
          </Link>
        </div>
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
