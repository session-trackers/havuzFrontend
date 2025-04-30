import { Link } from "react-router-dom";
import "./ListCardDelete.scss";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";

const ListCardDelete = ({ proje }) => {
  const token = localStorage.getItem("authToken");
  const handleProjectDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/image/post?postId=${proje.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="projeCardDelete">
      <div className="img">
        {/* <img src={proje.coverImage.filename} alt="" /> */}
        <img src={proje.coverImage} alt="" />
        <div className="buttonOverlay">
          <Link
            // to={`/kategoriler/${proje.postDetails.category.linkName}`}
            to={`/kategoriler`}
            target="_blank"
            rel="noopener noreferrer"
            className="iconBox"
          >
            <CallMissedOutgoingIcon />
          </Link>
          <Link to={`/admin/urunler/${proje.id}`} className="iconBox">
            <EditIcon />
          </Link>
          <button onClick={handleProjectDelete} className="iconBox">
            <DeleteIcon />
          </button>
        </div>
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

export default ListCardDelete;
